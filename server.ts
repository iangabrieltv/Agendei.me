import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  const PORT = 5000;

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: true,
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

async function startPreviewServer() {
  const preview = express();
  const PREVIEW_PORT = 3001;

  preview.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

  preview.use(express.static(path.join(__dirname, "dist"), {
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }));

  preview.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  });

  preview.listen(PREVIEW_PORT, "0.0.0.0", () => {
    console.log(`Preview server running on http://localhost:${PREVIEW_PORT}`);
  });
}

startServer();
startPreviewServer();
