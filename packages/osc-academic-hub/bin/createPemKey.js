const path = require("path");
const crypto = require("crypto");
const fs = require("fs");
const { encrypted } = require("../prisma/server-ca-enc");

const algorithm = "aes-128-cbc";
const decipher = crypto.createDecipheriv(
  algorithm,
  "jc7xh9d2lvw2uluo",
  "uf0k0dx55rp7u1sg"
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
