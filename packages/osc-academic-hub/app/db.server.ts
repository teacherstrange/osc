import { PrismaClient } from "@prisma/client";
import fs from "fs";
import { tmpdir } from "os";
import path from "path";
import crypto from "crypto";
import { encrypted } from "../prisma/server-ca-enc";

let prisma: PrismaClient;

declare global {
  var __db__: PrismaClient;
}

// fs.writeFile(
//   path.join(process.cwd(), `/prisma/server-ca.pem`),
//   CLIENT_CERTIFICATE.replace(/\n/g, " "),
//   (err) => {
//     if (err) return console.log(err);
//   }
// );

const algorithm = "aes-128-cbc";
const decipher = crypto.createDecipheriv(
  algorithm,
  process.env.SERVICE_ENCRYPTION_KEY!,
  process.env.SERVICE_ENCRYPTION_IV!
);

const getDecryptedSecret = () => {
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
};

fs.writeFile(
  path.join(process.cwd(), `/prisma/server-ca.pem`),
  getDecryptedSecret(),
  (err) => {
    if (err) return console.log(err);
  }
);

console.log(path.join(process.cwd(), `/prisma/server-ca.pem`));

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
