/**
 * Shared Prisma Client singleton — parallel to src/db/db.ts (the raw pg pool).
 * Introduced by the Prisma migration POC. Existing raw-pg code is untouched;
 * only the new *.prisma.ts service files import from here.
 *
 * Singleton guard prevents exhausting DB connections during ts-node-dev respawns.
 */
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
