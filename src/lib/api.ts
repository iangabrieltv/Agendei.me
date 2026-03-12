const BASE = "";

function getToken() {
  return localStorage.getItem("agendei_token");
}

function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
}

async function req<T>(method: string, path: string, body?: unknown): Promise<T> {
  const res = await fetch(BASE + path, {
    method,
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erro na requisição");
  return data as T;
}

// ─── AUTH ─────────────────────────────────────────────────────────────────

export interface UserSession {
  id: number;
  email: string;
  nomeBarbearia: string;
  status: "teste" | "pago" | "expirado";
  trialExpira?: string;
  onboarded: boolean;
}

export async function register(email: string, password: string, nomeBarbearia: string): Promise<{ token: string; user: UserSession }> {
  const data = await req<{ token: string; user: UserSession }>("POST", "/api/auth/register", { email, password, nomeBarbearia });
  localStorage.setItem("agendei_token", data.token);
  localStorage.setItem("agendei_session_v2", JSON.stringify(data.user));
  return data;
}

export async function login(email: string, password: string): Promise<{ token: string; user: UserSession }> {
  const data = await req<{ token: string; user: UserSession }>("POST", "/api/auth/login", { email, password });
  localStorage.setItem("agendei_token", data.token);
  localStorage.setItem("agendei_session_v2", JSON.stringify(data.user));
  return data;
}

export function logout() {
  localStorage.removeItem("agendei_token");
  localStorage.removeItem("agendei_session_v2");
}

export function getSession(): UserSession | null {
  const token = getToken();
  if (!token) return null;
  const saved = localStorage.getItem("agendei_session_v2");
  return saved ? JSON.parse(saved) : null;
}

export async function getMe(): Promise<UserSession> {
  return req<UserSession>("GET", "/api/auth/me");
}

// ─── PERFIL ───────────────────────────────────────────────────────────────

export interface Perfil {
  id: number;
  email: string;
  nome_barbearia: string;
  whatsapp: string;
  cor_tema: string;
  avatar_url: string;
  bio: string;
  endereco: string;
  status_assinatura: string;
  horarios: HorarioFuncionamento[];
}

export async function getPerfil(): Promise<Perfil> {
  return req<Perfil>("GET", "/api/perfil");
}

export async function updatePerfil(data: Partial<{ nomeBarbearia: string; whatsapp: string; corTema: string; avatarUrl: string; bio: string; endereco: string; instagram: string }>) {
  return req("PUT", "/api/perfil", data);
}

export async function completeOnboarding(data: {
  nomeBarbearia: string;
  whatsapp: string;
  avatarUrl?: string;
  servicos: Array<{ nome: string; preco: number; duracao: number }>;
  horarios?: HorarioFuncionamento[];
}) {
  return req("POST", "/api/onboarding", data);
}

// ─── SERVIÇOS ─────────────────────────────────────────────────────────────

export interface Servico {
  id: number;
  usuario_id: number;
  nome: string;
  preco: number;
  duracao_minutos: number;
  descricao?: string;
  ativo: boolean;
}

export async function getServicos(): Promise<Servico[]> {
  return req<Servico[]>("GET", "/api/servicos");
}

export async function createServico(data: { nome: string; preco: number; duracaoMinutos: number; descricao?: string }): Promise<Servico> {
  return req<Servico>("POST", "/api/servicos", data);
}

export async function updateServico(id: number, data: { nome: string; preco: number; duracaoMinutos: number; descricao?: string }) {
  return req("PUT", `/api/servicos/${id}`, data);
}

export async function deleteServico(id: number) {
  return req("DELETE", `/api/servicos/${id}`);
}

// ─── AGENDAMENTOS ─────────────────────────────────────────────────────────

export interface Agendamento {
  id: number;
  usuario_id: number;
  cliente_nome: string;
  cliente_whatsapp?: string;
  servico_id?: number;
  servico_nome: string;
  servico_preco?: number;
  data: string;
  horario: string;
  status: "pendente" | "confirmado" | "concluido" | "cancelado";
  origem: "interno" | "link_publico";
  notas?: string;
}

export async function getAgendamentos(): Promise<Agendamento[]> {
  return req<Agendamento[]>("GET", "/api/agendamentos");
}

export async function createAgendamento(data: {
  clienteNome: string;
  clienteWhatsapp?: string;
  servicoId?: number;
  servicoNome?: string;
  servicoPreco?: number;
  data: string;
  horario: string;
  notas?: string;
}): Promise<Agendamento> {
  return req<Agendamento>("POST", "/api/agendamentos", data);
}

export async function updateAgendamentoStatus(id: number, status: string) {
  return req("PUT", `/api/agendamentos/${id}`, { status });
}

export async function deleteAgendamento(id: number) {
  return req("DELETE", `/api/agendamentos/${id}`);
}

// ─── CLIENTES ─────────────────────────────────────────────────────────────

export interface Cliente {
  id: number;
  usuario_id: number;
  nome: string;
  whatsapp?: string;
  email?: string;
  historico_cortes: number;
  ultima_visita?: string;
  notas?: string;
}

export async function getClientes(): Promise<Cliente[]> {
  return req<Cliente[]>("GET", "/api/clientes");
}

export async function createCliente(data: { nome: string; whatsapp?: string; email?: string; notas?: string }): Promise<Cliente> {
  return req<Cliente>("POST", "/api/clientes", data);
}

export async function updateCliente(id: number, data: { nome: string; whatsapp?: string; email?: string; notas?: string }) {
  return req("PUT", `/api/clientes/${id}`, data);
}

export async function deleteCliente(id: number) {
  return req("DELETE", `/api/clientes/${id}`);
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────

export interface DashboardStats {
  agendamentosHoje: number;
  agendamentosMes: number;
  receitaMes: number;
  totalClientes: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return req<DashboardStats>("GET", "/api/dashboard/stats");
}

// ─── PÚBLICO ──────────────────────────────────────────────────────────────

export interface HorarioFuncionamento {
  dia_semana: number;
  aberto: boolean;
  hora_inicio: string;
  hora_fim: string;
}

export async function getPublicProfile(userId: number | string) {
  return req<{ perfil: Perfil; servicos: Servico[]; horarios: HorarioFuncionamento[] }>("GET", `/api/public/${userId}`);
}

export async function getHorariosDisponiveis(userId: number | string, data: string): Promise<{ slots: string[] }> {
  return req<{ slots: string[] }>("GET", `/api/public/${userId}/horarios/${data}`);
}

export async function criarAgendamentoPublico(userId: number | string, data: {
  clienteNome: string;
  clienteWhatsapp: string;
  servicoId: number;
  data: string;
  horario: string;
}) {
  return req("POST", `/api/public/${userId}/agendar`, data);
}
