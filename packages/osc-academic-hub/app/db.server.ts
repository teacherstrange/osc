import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { tmpdir } from "os";
import path from "path";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

fs.writeFile(
  path.join(process.cwd(), `/server-ca.pem`),
  process.env.CLIENT_CERTIFICATE!.replace(/\n/g, " "),
  (err) => {
    if (err) return console.log(err);
  }
);

console.log(path.join(process.cwd(), `/server-ca.pem`));

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
    global.__db__ = new PrismaClient({
      datasources: {
        db: {
          url: process.env.PLANETSCALE_PRISMA_DATABASE_URL,
        },
      },
    });
  }
  prisma = global.__db__;
  prisma.$connect();
}

export { prisma };
