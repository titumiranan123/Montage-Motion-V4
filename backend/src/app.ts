import express from "express";
import cors from "cors";
import config from "./config";
import { logger } from "./logger/logger";
import redisClient from "./db/redis";
import { globalErrorHandler } from "./midleware/globalErrorHandler";
import cookieParser from "cookie-parser";
import { invalidateRoute } from "./midleware/invalideroute";
import mainRoute from "./main.route";

const app = express();
app.use(
  cors({
    origin: [
      "https://dashboard.montagemotion.com",
      "www.dashboard.montagemotion.com",
      "montagemotion.com",
      "https://montagemotion.com",
      "http://localhost:5001",
      "http://localhost:5000",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));

app.use(mainRoute);
app.get("/", (_req, res) => {
  res.send("connected ");
});

app.use(invalidateRoute);
app.use(globalErrorHandler);
(async () => {
  await redisClient.set("test-key", "Hello Redis Cloud!");
  const value = await redisClient.get("test-key");
  logger.info("Redis Test Value:", value);
})();

app.listen(config.port, () => {
  logger.info(
    `Server connect on ${config.port} this port: url : ${`http://localhost:${config.port}`}`,
  );
});
