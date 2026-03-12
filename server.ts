import express, { Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "agendei_secret_2024_super_secure";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL?.includes("localhost") ? false : { rejectUnauthorized: false }
});

// Auth middleware
const authMiddleware = async (req: Request & { userId?: number; userStatus?: string }, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Token não fornecido" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; status: string };
    req.userId = decoded.id;
    req.userStatus = decoded.status;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
};

type AuthReq = Request & { userId?: number; userStatus?: string };

async function startServer() {
  const app = express();
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // ─── AUTH ─────────────────────────────────────────────────────────────────

  app.post("/api/auth/register", async (req, res) => {
    const { email, password, nomeBarbearia } = req.body;
    if (!email || !password || !nomeBarbearia)
      return res.status(400).json({ error: "Preencha todos os campos" });

    try {
      const existing = await pool.query("SELECT id FROM usuarios WHERE email = $1", [email]);
      if (existing.rows.length > 0)
        return res.status(409).json({ error: "E-mail já cadastrado" });

      const senhaHash = await bcrypt.hash(password, 10);
      const result = await pool.query(
        `INSERT INTO usuarios (email, senha_hash, nome_barbearia, status_assinatura, data_criacao, data_expiracao_trial)
         VALUES ($1, $2, $3, 'teste', NOW(), NOW() + INTERVAL '7 days')
         RETURNING id, email, nome_barbearia, status_assinatura, data_expiracao_trial`,
        [email, senhaHash, nomeBarbearia]
      );
      const user = result.rows[0];
      const token = jwt.sign({ id: user.id, status: user.status_assinatura }, JWT_SECRET, { expiresIn: "30d" });
      res.json({ token, user: { id: user.id, email: user.email, nomeBarbearia: user.nome_barbearia, status: user.status_assinatura, onboarded: false } });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Preencha todos os campos" });

    try {
      const result = await pool.query(
        "SELECT id, email, senha_hash, nome_barbearia, status_assinatura, data_expiracao_trial FROM usuarios WHERE email = $1",
        [email]
      );
      if (result.rows.length === 0)
        return res.status(401).json({ error: "E-mail ou senha incorretos" });

      const user = result.rows[0];
      const valid = await bcrypt.compare(password, user.senha_hash);
      if (!valid)
        return res.status(401).json({ error: "E-mail ou senha incorretos" });

      // Check if trial expired
      if (user.status_assinatura === "teste" && new Date() > new Date(user.data_expiracao_trial)) {
        await pool.query("UPDATE usuarios SET status_assinatura = 'expirado' WHERE id = $1", [user.id]);
        user.status_assinatura = "expirado";
      }

      // Check if profile exists
      const profile = await pool.query("SELECT id, nome FROM usuarios WHERE id = $1", [user.id]);
      const horarios = await pool.query("SELECT id FROM horarios_funcionamento WHERE usuario_id = $1 LIMIT 1", [user.id]);
      const onboarded = horarios.rows.length > 0;

      const token = jwt.sign({ id: user.id, status: user.status_assinatura }, JWT_SECRET, { expiresIn: "30d" });
      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          nomeBarbearia: user.nome_barbearia,
          status: user.status_assinatura,
          trialExpira: user.data_expiracao_trial,
          onboarded
        }
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/auth/me", authMiddleware, async (req: AuthReq, res) => {
    try {
      const result = await pool.query(
        `SELECT u.id, u.email, u.nome_barbearia, u.status_assinatura, u.data_expiracao_trial,
                u.whatsapp, u.cor_tema, u.avatar_url, u.bio, u.endereco
         FROM usuarios u WHERE u.id = $1`,
        [req.userId]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: "Usuário não encontrado" });
      const horarios = await pool.query("SELECT id FROM horarios_funcionamento WHERE usuario_id = $1 LIMIT 1", [req.userId]);
      const user = result.rows[0];
      res.json({ ...user, onboarded: horarios.rows.length > 0 });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── PERFIL / ONBOARDING ──────────────────────────────────────────────────

  app.get("/api/perfil", authMiddleware, async (req: AuthReq, res) => {
    try {
      const result = await pool.query(
        "SELECT id, email, nome_barbearia, whatsapp, cor_tema, avatar_url, bio, endereco, status_assinatura FROM usuarios WHERE id = $1",
        [req.userId]
      );
      const horarios = await pool.query(
        "SELECT dia_semana, aberto, hora_inicio, hora_fim FROM horarios_funcionamento WHERE usuario_id = $1 ORDER BY dia_semana",
        [req.userId]
      );
      res.json({ ...result.rows[0], horarios: horarios.rows });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/perfil", authMiddleware, async (req: AuthReq, res) => {
    const { nomeBarbearia, whatsapp, corTema, avatarUrl, bio, endereco, instagram } = req.body;
    try {
      await pool.query(
        "UPDATE usuarios SET nome_barbearia = COALESCE($1, nome_barbearia), whatsapp = COALESCE($2, whatsapp), cor_tema = COALESCE($3, cor_tema), avatar_url = COALESCE($4, avatar_url), bio = COALESCE($5, bio), endereco = COALESCE($6, endereco), updated_at = NOW() WHERE id = $7",
        [nomeBarbearia, whatsapp, corTema, avatarUrl, bio, endereco, req.userId]
      );
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/onboarding", authMiddleware, async (req: AuthReq, res) => {
    const { nomeBarbearia, whatsapp, avatarUrl, servicos, horarios } = req.body;
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Update user profile
      await client.query(
        "UPDATE usuarios SET nome_barbearia = $1, whatsapp = $2, avatar_url = $3, updated_at = NOW() WHERE id = $4",
        [nomeBarbearia, whatsapp, avatarUrl || null, req.userId]
      );

      // Save services (max 2 on trial)
      if (servicos && servicos.length > 0) {
        await client.query("DELETE FROM servicos WHERE usuario_id = $1", [req.userId]);
        for (const s of servicos.slice(0, 2)) {
          await client.query(
            "INSERT INTO servicos (usuario_id, nome, preco, duracao_minutos) VALUES ($1, $2, $3, $4)",
            [req.userId, s.nome || s.name, parseFloat(s.preco || s.price) || 0, parseInt(s.duracao || s.duration) || 30]
          );
        }
      }

      // Save schedule
      if (horarios && horarios.length > 0) {
        await client.query("DELETE FROM horarios_funcionamento WHERE usuario_id = $1", [req.userId]);
        for (const h of horarios) {
          await client.query(
            "INSERT INTO horarios_funcionamento (usuario_id, dia_semana, aberto, hora_inicio, hora_fim) VALUES ($1, $2, $3, $4, $5)",
            [req.userId, h.dia_semana, h.aberto, h.hora_inicio || "09:00", h.hora_fim || "18:00"]
          );
        }
      } else {
        // Default schedule (Mon-Sat, 9-18)
        await client.query("DELETE FROM horarios_funcionamento WHERE usuario_id = $1", [req.userId]);
        for (let d = 1; d <= 6; d++) {
          await client.query(
            "INSERT INTO horarios_funcionamento (usuario_id, dia_semana, aberto, hora_inicio, hora_fim) VALUES ($1, $2, $3, '09:00', '18:00')",
            [req.userId, d, d !== 0]
          );
        }
      }

      await client.query("COMMIT");
      res.json({ success: true });
    } catch (err: any) {
      await client.query("ROLLBACK");
      res.status(500).json({ error: err.message });
    } finally {
      client.release();
    }
  });

  // ─── SERVIÇOS ─────────────────────────────────────────────────────────────

  app.get("/api/servicos", authMiddleware, async (req: AuthReq, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM servicos WHERE usuario_id = $1 AND ativo = true ORDER BY created_at",
        [req.userId]
      );
      res.json(result.rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/servicos", authMiddleware, async (req: AuthReq, res) => {
    const { nome, preco, duracaoMinutos, descricao } = req.body;
    try {
      // Trial limit: max 2 services
      const statusResult = await pool.query("SELECT status_assinatura FROM usuarios WHERE id = $1", [req.userId]);
      const status = statusResult.rows[0]?.status_assinatura;
      if (status === "teste" || status === "expirado") {
        const count = await pool.query("SELECT COUNT(*) FROM servicos WHERE usuario_id = $1 AND ativo = true", [req.userId]);
        if (parseInt(count.rows[0].count) >= 2) {
          return res.status(403).json({ error: "Limite de 2 serviços no plano gratuito. Faça upgrade para Pro.", trialLimit: true });
        }
      }
      const result = await pool.query(
        "INSERT INTO servicos (usuario_id, nome, preco, duracao_minutos, descricao) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [req.userId, nome, parseFloat(preco), parseInt(duracaoMinutos) || 30, descricao || null]
      );
      res.json(result.rows[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/servicos/:id", authMiddleware, async (req: AuthReq, res) => {
    const { nome, preco, duracaoMinutos, descricao } = req.body;
    try {
      await pool.query(
        "UPDATE servicos SET nome = $1, preco = $2, duracao_minutos = $3, descricao = $4 WHERE id = $5 AND usuario_id = $6",
        [nome, parseFloat(preco), parseInt(duracaoMinutos) || 30, descricao || null, req.params.id, req.userId]
      );
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/servicos/:id", authMiddleware, async (req: AuthReq, res) => {
    try {
      await pool.query("UPDATE servicos SET ativo = false WHERE id = $1 AND usuario_id = $2", [req.params.id, req.userId]);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── AGENDAMENTOS ─────────────────────────────────────────────────────────

  app.get("/api/agendamentos", authMiddleware, async (req: AuthReq, res) => {
    try {
      const result = await pool.query(
        `SELECT a.*, s.nome as servico_nome_atual, s.preco as servico_preco_atual, s.duracao_minutos
         FROM agendamentos a
         LEFT JOIN servicos s ON a.servico_id = s.id
         WHERE a.usuario_id = $1
         ORDER BY a.data DESC, a.horario DESC`,
        [req.userId]
      );
      res.json(result.rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/agendamentos", authMiddleware, async (req: AuthReq, res) => {
    const { clienteNome, clienteWhatsapp, servicoId, data, horario, notas } = req.body;
    try {
      const servico = servicoId
        ? await pool.query("SELECT nome, preco FROM servicos WHERE id = $1", [servicoId])
        : { rows: [] };
      const servicoNome = servico.rows[0]?.nome || req.body.servicoNome || "";
      const servicoPreco = servico.rows[0]?.preco || req.body.servicoPreco || 0;

      const result = await pool.query(
        `INSERT INTO agendamentos (usuario_id, cliente_nome, cliente_whatsapp, servico_id, servico_nome, servico_preco, data, horario, notas, origem)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'interno') RETURNING *`,
        [req.userId, clienteNome, clienteWhatsapp || null, servicoId || null, servicoNome, servicoPreco, data, horario, notas || null]
      );
      res.json(result.rows[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/agendamentos/:id", authMiddleware, async (req: AuthReq, res) => {
    const { status, clienteNome, clienteWhatsapp, servicoId, data, horario, notas } = req.body;
    try {
      if (status) {
        await pool.query(
          "UPDATE agendamentos SET status = $1 WHERE id = $2 AND usuario_id = $3",
          [status, req.params.id, req.userId]
        );

        // Auto-create transaction when completed
        if (status === "concluido") {
          const ag = await pool.query("SELECT * FROM agendamentos WHERE id = $1", [req.params.id]);
          if (ag.rows[0]?.servico_preco) {
            await pool.query(
              "INSERT INTO transacoes (usuario_id, agendamento_id, descricao, valor, tipo) VALUES ($1, $2, $3, $4, 'entrada')",
              [req.userId, req.params.id, ag.rows[0].servico_nome, ag.rows[0].servico_preco]
            );
          }
        }
      } else {
        const servico = servicoId
          ? await pool.query("SELECT nome, preco FROM servicos WHERE id = $1", [servicoId])
          : { rows: [] };
        await pool.query(
          `UPDATE agendamentos SET cliente_nome = $1, cliente_whatsapp = $2, servico_id = $3,
           servico_nome = $4, servico_preco = $5, data = $6, horario = $7, notas = $8 WHERE id = $9 AND usuario_id = $10`,
          [clienteNome, clienteWhatsapp, servicoId, servico.rows[0]?.nome, servico.rows[0]?.preco, data, horario, notas, req.params.id, req.userId]
        );
      }
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/agendamentos/:id", authMiddleware, async (req: AuthReq, res) => {
    try {
      await pool.query("DELETE FROM agendamentos WHERE id = $1 AND usuario_id = $2", [req.params.id, req.userId]);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── CLIENTES ─────────────────────────────────────────────────────────────

  app.get("/api/clientes", authMiddleware, async (req: AuthReq, res) => {
    try {
      const result = await pool.query(
        "SELECT * FROM clientes WHERE usuario_id = $1 ORDER BY nome",
        [req.userId]
      );
      res.json(result.rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/clientes", authMiddleware, async (req: AuthReq, res) => {
    const { nome, whatsapp, email, notas } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO clientes (usuario_id, nome, whatsapp, email, notas) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [req.userId, nome, whatsapp || null, email || null, notas || null]
      );
      res.json(result.rows[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/api/clientes/:id", authMiddleware, async (req: AuthReq, res) => {
    const { nome, whatsapp, email, notas } = req.body;
    try {
      await pool.query(
        "UPDATE clientes SET nome = $1, whatsapp = $2, email = $3, notas = $4 WHERE id = $5 AND usuario_id = $6",
        [nome, whatsapp, email, notas, req.params.id, req.userId]
      );
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/api/clientes/:id", authMiddleware, async (req: AuthReq, res) => {
    try {
      await pool.query("DELETE FROM clientes WHERE id = $1 AND usuario_id = $2", [req.params.id, req.userId]);
      res.json({ success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── DASHBOARD STATS ──────────────────────────────────────────────────────

  app.get("/api/dashboard/stats", authMiddleware, async (req: AuthReq, res) => {
    try {
      const hoje = new Date().toISOString().split("T")[0];

      const [agendHoje, agendMes, receita, clientes] = await Promise.all([
        pool.query("SELECT COUNT(*) FROM agendamentos WHERE usuario_id = $1 AND data = $2", [req.userId, hoje]),
        pool.query("SELECT COUNT(*) FROM agendamentos WHERE usuario_id = $1 AND DATE_TRUNC('month', data) = DATE_TRUNC('month', CURRENT_DATE)", [req.userId]),
        pool.query("SELECT COALESCE(SUM(valor), 0) as total FROM transacoes WHERE usuario_id = $1 AND DATE_TRUNC('month', data) = DATE_TRUNC('month', CURRENT_DATE) AND tipo = 'entrada'", [req.userId]),
        pool.query("SELECT COUNT(*) FROM clientes WHERE usuario_id = $1", [req.userId])
      ]);

      res.json({
        agendamentosHoje: parseInt(agendHoje.rows[0].count),
        agendamentosMes: parseInt(agendMes.rows[0].count),
        receitaMes: parseFloat(receita.rows[0].total),
        totalClientes: parseInt(clientes.rows[0].count)
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── TRANSAÇÕES (Pro only) ────────────────────────────────────────────────

  app.get("/api/transacoes", authMiddleware, async (req: AuthReq, res) => {
    if (req.userStatus !== "pago") {
      return res.status(403).json({ error: "Funcionalidade exclusiva do plano Pro" });
    }
    try {
      const result = await pool.query(
        "SELECT * FROM transacoes WHERE usuario_id = $1 ORDER BY data DESC LIMIT 100",
        [req.userId]
      );
      res.json(result.rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── EQUIPE (Pro only) ────────────────────────────────────────────────────

  app.get("/api/equipe", authMiddleware, async (req: AuthReq, res) => {
    if (req.userStatus !== "pago") {
      return res.status(403).json({ error: "Funcionalidade exclusiva do plano Pro" });
    }
    try {
      const result = await pool.query(
        "SELECT * FROM equipe WHERE usuario_id = $1 AND ativo = true ORDER BY nome",
        [req.userId]
      );
      res.json(result.rows);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── PÚBLICO (Link Bio) ───────────────────────────────────────────────────

  app.get("/api/public/:userId", async (req, res) => {
    try {
      const user = await pool.query(
        "SELECT id, nome_barbearia, whatsapp, cor_tema, avatar_url, bio, endereco FROM usuarios WHERE id = $1 AND status_assinatura != 'expirado'",
        [req.params.userId]
      );
      if (user.rows.length === 0)
        return res.status(404).json({ error: "Profissional não encontrado" });

      const servicos = await pool.query(
        "SELECT id, nome, preco, duracao_minutos, descricao FROM servicos WHERE usuario_id = $1 AND ativo = true ORDER BY created_at",
        [req.params.userId]
      );

      const horarios = await pool.query(
        "SELECT dia_semana, aberto, hora_inicio, hora_fim FROM horarios_funcionamento WHERE usuario_id = $1 ORDER BY dia_semana",
        [req.params.userId]
      );

      res.json({ perfil: user.rows[0], servicos: servicos.rows, horarios: horarios.rows });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/api/public/:userId/agendar", async (req, res) => {
    const { clienteNome, clienteWhatsapp, servicoId, data, horario } = req.body;
    const usuarioId = parseInt(req.params.userId);
    try {
      // Verify slot is available
      const conflict = await pool.query(
        "SELECT id FROM agendamentos WHERE usuario_id = $1 AND data = $2 AND horario = $3 AND status != 'cancelado'",
        [usuarioId, data, horario]
      );
      if (conflict.rows.length > 0)
        return res.status(409).json({ error: "Horário já ocupado" });

      const servico = await pool.query("SELECT nome, preco FROM servicos WHERE id = $1", [servicoId]);
      const result = await pool.query(
        `INSERT INTO agendamentos (usuario_id, cliente_nome, cliente_whatsapp, servico_id, servico_nome, servico_preco, data, horario, status, origem)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'pendente', 'link_publico') RETURNING id`,
        [usuarioId, clienteNome, clienteWhatsapp, servicoId, servico.rows[0]?.nome, servico.rows[0]?.preco, data, horario]
      );

      // Upsert client
      await pool.query(
        `INSERT INTO clientes (usuario_id, nome, whatsapp, ultima_visita)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT DO NOTHING`,
        [usuarioId, clienteNome, clienteWhatsapp]
      );

      res.json({ id: result.rows[0].id, success: true });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── HORÁRIOS DISPONÍVEIS ─────────────────────────────────────────────────

  app.get("/api/public/:userId/horarios/:data", async (req, res) => {
    try {
      const { userId, data } = req.params;
      const diaSemana = new Date(data + "T00:00:00").getDay();

      const horario = await pool.query(
        "SELECT aberto, hora_inicio, hora_fim FROM horarios_funcionamento WHERE usuario_id = $1 AND dia_semana = $2",
        [userId, diaSemana]
      );

      if (!horario.rows[0] || !horario.rows[0].aberto)
        return res.json({ slots: [] });

      const ocupados = await pool.query(
        "SELECT horario FROM agendamentos WHERE usuario_id = $1 AND data = $2 AND status != 'cancelado'",
        [userId, data]
      );
      const ocupadosSet = new Set(ocupados.rows.map((r: any) => r.horario.slice(0, 5)));

      const { hora_inicio, hora_fim } = horario.rows[0];
      const slots: string[] = [];
      let [h, m] = hora_inicio.split(":").map(Number);
      const [hFim, mFim] = hora_fim.split(":").map(Number);
      while (h < hFim || (h === hFim && m < mFim)) {
        const slot = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        if (!ocupadosSet.has(slot)) slots.push(slot);
        m += 30;
        if (m >= 60) { m -= 60; h++; }
      }
      res.json({ slots });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // ─── VITE / STATIC ────────────────────────────────────────────────────────

  const PORT = 5000;
  const PREVIEW_PORT = 3001;

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true, allowedHosts: true, hmr: process.env.DISABLE_HMR !== "true" },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => console.log(`Server running on http://localhost:${PORT}`));

  // Static preview server for canvas
  const preview = express();
  preview.use((_req, res, next) => { res.setHeader("X-Frame-Options", "ALLOWALL"); next(); });
  preview.use(express.static(path.join(__dirname, "dist"), { setHeaders: res => res.setHeader("Cache-Control", "no-cache") }));
  preview.get("*", (_req, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));
  preview.listen(PREVIEW_PORT, "0.0.0.0", () => console.log(`Preview server on http://localhost:${PREVIEW_PORT}`));
}

startServer();
