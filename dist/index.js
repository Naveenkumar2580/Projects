// server/index.ts
import express2 from "express";
import path3 from "path";
import dotenv2 from "dotenv";
import helmet from "helmet";
import { fileURLToPath as fileURLToPath2 } from "url";

// server/routes.ts
import { createServer } from "http";

// server/firebaseAdmin.ts
import admin from "firebase-admin";
import { getDatabase } from "firebase-admin/database";
import * as dotenv from "dotenv";
dotenv.config();
var serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
if (!serviceAccountKey) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY is not defined in the environment variables.");
}
var serviceAccount = JSON.parse(serviceAccountKey);
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
    // Load the database URL from environment variables
  });
}
var db = getDatabase();

// server/routes.ts
async function registerRoutes(app2) {
  const handleErrorResponse = (res, message, statusCode) => {
    console.error(`Error: ${message}`);
    return res.status(statusCode).json({ message });
  };
  app2.post("/api/feedback", async (req, res) => {
    const { content, userId } = req.body;
    if (!content) {
      return handleErrorResponse(res, "Feedback content is required", 400);
    }
    try {
      const feedbackRef = db.ref("feedbacks");
      const newFeedbackRef = feedbackRef.push();
      await newFeedbackRef.set({
        content,
        userId: userId || "anonymous",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      return res.status(201).json({
        message: "Feedback submitted successfully",
        id: newFeedbackRef.key
      });
    } catch (error) {
      console.error("Failed to save feedback:", error);
      res.status(500).json({ message: "Failed to save feedback" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return handleErrorResponse(res, "Name, email, and message are required", 400);
    }
    try {
      const contactRef = db.ref("contacts");
      const newContactRef = contactRef.push();
      await newContactRef.set({
        name,
        email,
        subject: subject || "",
        message,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      return res.status(201).json({
        message: "Message sent successfully",
        id: newContactRef.key
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });
  app2.post("/api/orders", async (req, res) => {
    const {
      service,
      price,
      currency,
      customerName,
      customerEmail,
      customerPhone,
      requirements,
      userId
    } = req.body;
    if (!service || !price || !customerName || !customerEmail || !customerPhone) {
      return handleErrorResponse(
        res,
        "Missing required fields for order submission",
        400
      );
    }
    try {
      const orderRef = db.ref("orders");
      const newOrderRef = orderRef.push();
      await newOrderRef.set({
        service,
        price,
        currency: currency || "USD",
        customerName,
        customerEmail,
        customerPhone,
        requirements: requirements || "",
        userId: userId || null,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      return res.status(201).json({
        message: "Order submitted successfully",
        id: newOrderRef.key
      });
    } catch (error) {
      console.error("Failed to submit order:", error);
      res.status(500).json({ message: "Failed to submit order" });
    }
  });
  return createServer(app2);
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { fileURLToPath } from "url";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path2.dirname(__filename);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    // Use Vite as middleware
    hmr: { server },
    // Hot Module Replacement configuration
    allowedHosts: ["localhost", "127.0.0.1"]
    // Set allowed hosts explicitly
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
    // Specify app type as custom for middleware integration
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}

// server/index.ts
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = path3.dirname(__filename2);
dotenv2.config();
var port = process.env.PORT || "3000";
var nodeEnv = process.env.NODE_ENV || "development";
if (!process.env.PORT || !process.env.NODE_ENV) {
  console.warn("\u26A0\uFE0F Missing PORT or NODE_ENV in .env. Falling back to defaults.");
}
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use(helmet());
app.use((req, res, next) => {
  const start = Date.now();
  const requestPath = req.path;
  let capturedJsonResponse;
  const originalJson = res.json;
  res.json = function(body, ...args) {
    capturedJsonResponse = body;
    return originalJson.apply(res, [body, ...args]);
  };
  res.on("finish", () => {
    if (requestPath.startsWith("/api")) {
      let logLine = `${req.method} ${requestPath} ${res.statusCode} in ${Date.now() - start}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 100) logLine = logLine.slice(0, 99) + "\u2026";
      log?.(logLine);
    }
  });
  next();
});
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  log?.(`\u274C Error ${status}: ${message}`);
  res.status(status).json({ message });
});
(async () => {
  try {
    const server = await registerRoutes(app);
    if (nodeEnv === "development") {
      await setupVite(app, server);
    } else {
      app.use(express2.static(path3.join(__dirname2, "dist")));
    }
    server.listen({ port: Number(port), host: "0.0.0.0", reusePort: true }, () => {
      log?.(`\u{1F680} Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("\u274C Server startup error:", err.message || err);
    process.exit(1);
  }
})();
