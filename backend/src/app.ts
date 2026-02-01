import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "./config";
import { logger } from "./logger/logger";
import mainRoute from "./main.route";
import { invalidateRoute } from "./midleware/invalideroute";
import globalErrorHandler from "./midleware/globalErrorHandler";

const app = express();

/* ------------------------------------------------------------------
   CORS CONFIGURATION (PRODUCTION SAFE)
------------------------------------------------------------------- */
const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server, mobile apps, curl, postman
    if (!origin) {
      return callback(null, true);
    }

    // Allow all montagemotion subdomains
    if (
      origin.endsWith(".montagemotion.com") ||
      origin === "https://montagemotion.com" ||
      origin === "http://localhost:5000" ||
      origin === "http://localhost:5001" ||
      origin === "http://localhost:3000"
    ) {
      return callback(null, true);
    }

    // Reject others silently (avoid crashing server)
    return callback(null, false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range", "X-Total-Count"],
  maxAge: 86400, // 24h
};

/* ------------------------------------------------------------------
   GLOBAL MIDDLEWARES
------------------------------------------------------------------- */

// CORS (auto handles preflight)
app.use(cors(corsOptions));

// Cookie parsing
app.use(cookieParser());

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.text({ type: "application/xml", limit: "10mb" }));

// Debug logging (non-production only)
if (config.nodeEnv !== "production") {
  app.use((req: Request, _res: Response, next: NextFunction) => {
    logger.debug(
      `${req.method} ${req.originalUrl} | Origin: ${req.get("origin")}`,
    );
    next();
  });
}

/* ------------------------------------------------------------------
   HEALTH & DEBUG ROUTES
------------------------------------------------------------------- */

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/cors-test", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    origin: req.get("origin"),
    credentials: true,
    methods: corsOptions.methods,
  });
});

/* ------------------------------------------------------------------
   MAIN ROUTES
------------------------------------------------------------------- */

app.use(mainRoute);

/* ------------------------------------------------------------------
   ERROR HANDLING
------------------------------------------------------------------- */

// 404 handler
app.use(invalidateRoute);

// Global error handler (always last)
app.use(globalErrorHandler);

/* ------------------------------------------------------------------
   SERVER BOOTSTRAP (TEST FRIENDLY)
------------------------------------------------------------------- */

if (require.main === module) {
  app.listen(config.port, () => {
    logger.info(
      `🚀 Server running on port ${config.port} | http://localhost:${config.port}`,
    );
  });
}

export default app;
