import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
  console.log(
    process.env.NODE_ENV,
    process.env.PLANETSCALE_PRISMA_DATABASE_URL
  );
  prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.PLANETSCALE_PRISMA_DATABASE_URL,
      },
    },
  });
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient();
  }
  prisma = global.__db__;
  prisma.$connect();
}

export { prisma };
