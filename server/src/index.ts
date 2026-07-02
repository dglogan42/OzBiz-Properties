import cors from "cors";
import express from "express";
import { initDatabase } from "./db.js";
import { contactsRouter } from "./routes/contacts.js";
import { enquiriesRouter } from "./routes/enquiries.js";
import { propertiesRouter } from "./routes/properties.js";

const PORT = Number(process.env.PORT) || 3001;

initDatabase();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "ozbiz-properties-api" });
});

app.use("/api/properties", propertiesRouter);
app.use("/api/enquiries", enquiriesRouter);
app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`OzBiz API running at http://localhost:${PORT}`);
});