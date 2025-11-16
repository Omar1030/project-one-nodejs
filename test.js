const { randomBytes, createHash } = require("node:crypto");

const x = randomBytes(16).toString("hex");
const hash = createHash("sha256").update(x).digest("hex");

console.log(hash);
