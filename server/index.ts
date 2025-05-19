import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import helmet from 'helmet';
import { fileURLToPath } from 'url';

// Import the route registration function
import { registerRoutes } from './routes'; // Correct import

import { setupVite, log } from './vite'; // Vite dev server and custom logger
import './firebaseAdmin'; // Firebase admin initialization

// Setup for ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();
const port = process.env.PORT || '3000';
const nodeEnv = process.env.NODE_ENV || 'development';

if (!process.env.PORT || !process.env.NODE_ENV) {
  console.warn('⚠️ Missing PORT or NODE_ENV in .env. Falling back to defaults.');
}

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());

// Custom logging middleware for API routes
app.use((req, res, next) => {
  const start = Date.now();
  const requestPath = req.path;
  let capturedJsonResponse: any;

  const originalJson = res.json;
  res.json = function (body, ...args) {
    capturedJsonResponse = body;
    return originalJson.apply(res, [body, ...args]);
  };

  res.on('finish', () => {
    if (requestPath.startsWith('/api')) {
      let logLine = `${req.method} ${requestPath} ${res.statusCode} in ${Date.now() - start}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 100) logLine = logLine.slice(0, 99) + '…';
      log?.(logLine); // Safe call
    }
  });

  next();
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  log?.(`❌ Error ${status}: ${message}`);
  res.status(status).json({ message });
});

// Server Bootstrap
(async () => {
  try {
    const server = await registerRoutes(app); // Register routes here

    if (nodeEnv === 'development') {
      await setupVite(app, server); // Setup Vite for development
    } else {
      app.use(express.static(path.join(__dirname, 'dist'))); // Serve static files for production
    }

    server.listen({ port: Number(port), host: '0.0.0.0', reusePort: true }, () => {
      log?.(`🚀 Server running at http://localhost:${port}`);
    });
  } catch (err: any) {
    console.error('❌ Server startup error:', err.message || err);
    process.exit(1);
  }
})();
