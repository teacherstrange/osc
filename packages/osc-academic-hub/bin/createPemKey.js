const fs = require("fs");
const path = require("path");
require("dotenv").config();

fs.writeFile(
  path.join(process.cwd(), `/prisma/server-ca.pem`),
  process.env.CLIENT_CERTIFICATE.replace(/\n/g, " "),
  (err) => {
    if (err) return console.log(err);
  }
);

console.log(path.join(process.cwd(), `/prisma/server-ca.pem`));
