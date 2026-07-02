import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { initDatabase } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.resolve(__dirname, "../data/ozbiz.db");

if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
}

initDatabase();
console.log("Database reseeded successfully");