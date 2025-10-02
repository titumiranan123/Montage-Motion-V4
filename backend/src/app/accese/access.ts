/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { Request, Response } from "express";
import { UAParser } from "ua-parser-js";

import { isIP } from "net";

import { errorLogger } from "../../logger/logger";
import { db } from "../../db/db";
import { responseHandler } from "../../utils/responseHandler";

interface GeoResponse {
  country?: string;
  regionName?: string;
  city?: string;
  isp?: string;
  query?: string;
}

export const getAccessInfo = async (req: Request) => {
  const parser = new UAParser(req.headers["user-agent"]);
  const result = parser.getResult();
  const userAgent = req.headers["user-agent"] || "";

  // Function to extract real client IP
  const getClientIp = (req: Request) => {
    const headersToCheck = [
      "x-client-ip",
      "x-forwarded-for",
      "cf-connecting-ip",
      "fastly-client-ip",
      "true-client-ip",
      "x-real-ip",
      "x-cluster-client-ip",
      "x-forwarded",
      "forwarded-for",
      "forwarded",
    ];

    for (const header of headersToCheck) {
      const value = req.headers[header];
      if (value) {
        const ips = Array.isArray(value) ? value.join(",") : value;
        const firstIp = ips.split(",")[0].trim();
        if (firstIp && isIP(firstIp)) return firstIp;
      }
    }

    return req.connection?.remoteAddress || req.socket?.remoteAddress || req.ip;
  };

  let ip = getClientIp(req);
  // Normalize IPv6-mapped IPv4 addresses
  ip = ip?.startsWith("::ffff:") ? ip?.substring(7) : ip;

  // Validate IP
  if (!isIP(ip ?? "")) {
    errorLogger.error("Invalid IP address detected:", ip);
    ip = "invalid-ip";
  }

  const device = result.device.model || "unknown";

  let geo: GeoResponse = {};
  let existingVisitor = null;
  const client = await db.connect();

  try {
    // Check for existing visitor by IP AND device
    const existingVisitorQuery = await client.query(
      "SELECT * FROM visitors WHERE ip = $1 AND device = $2",
      [ip, device],
    );
    existingVisitor = existingVisitorQuery.rows[0];

    // If no exact match, check if either IP or device exists separately
    if (!existingVisitor) {
      const eitherMatchQuery = await client.query(
        "SELECT * FROM visitors WHERE ip = $1 OR device = $2 LIMIT 1",
        [ip, device],
      );

      if (eitherMatchQuery.rows.length > 0) {
        // IP or device exists but not together - treat as new visitor
        existingVisitor = null;
      }
    }

    // Get geo location data only if IP is valid
    if (isIP(ip ?? "")) {
      try {
        const { data } = await axios.get<GeoResponse>(
          `http://ip-api.com/json/${ip}?fields=country,regionName,city,isp,query`,
        );
        geo = data;
        // Use the IP returned by the API in case our extraction was wrong
        if (data.query && isIP(data.query)) {
          ip = data.query;
        }
      } catch (error: any) {
        errorLogger.error("Geo lookup failed:", error.message);
      }
    }
  } finally {
    client.release();
  }

  try {
    const visitorData = {
      ip,
      country: geo.country || null,
      region: geo.regionName || null,
      city: geo.city || null,
      provider: geo.isp || null,
      device: device,
      os: result.os.name || null,
      browser: result.browser.name || null,
      user_agent: userAgent,
      is_duplicate: false,
      last_visit: new Date(),
    };

    const newClient = await db.connect();
    try {
      if (existingVisitor) {
        // Update existing visitor
        await newClient.query(
          `UPDATE visitors SET
            country = $1,
            region = $2,
            city = $3,
            provider = $4,
            os = $5,
            browser = $6,
            user_agent = $7,
            last_visit = $8,
            visit_count = visit_count + 1
          WHERE ip = $9 AND device = $10`,
          [
            visitorData.country,
            visitorData.region,
            visitorData.city,
            visitorData.provider,
            visitorData.os,
            visitorData.browser,
            visitorData.user_agent,
            visitorData.last_visit,
            ip,
            device,
          ],
        );
      } else {
        // Create new visitor
        await newClient.query(
          `INSERT INTO visitors (
             ip, country, region, city, provider,
            device, os, browser, user_agent, is_duplicate,
            last_visit, first_visit, visit_count
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [
            visitorData.ip,
            visitorData.country,
            visitorData.region,
            visitorData.city,
            visitorData.provider,
            visitorData.device,
            visitorData.os,
            visitorData.browser,
            visitorData.user_agent,
            visitorData.is_duplicate,
            visitorData.last_visit,
            visitorData.last_visit,
            1,
          ],
        );
      }
    } finally {
      newClient.release();
    }

    return {
      ...visitorData,
      is_new_visitor: !existingVisitor,
      geo_info: geo,
    };
  } catch (err) {
    errorLogger.error("Error saving access info:", err);
    throw err;
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await db.query(`SELECT * FROM visitors`);
    // Return the collected information
    responseHandler(
      res,
      200,
      true,
      "Visitor information tracked successfully",
      data.rows,
    );
  } catch (error) {
    errorLogger.error("API Error in /track-visitor:", error);
    throw new Error("Failed to track visitor information");
  }
};
