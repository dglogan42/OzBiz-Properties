import { Router } from "express";
import { createContact } from "../db.js";
import type { ContactInput } from "../types.js";

export const contactsRouter = Router();

contactsRouter.post("/", (req, res) => {
  const { name, email, phone, subject, message } = req.body as ContactInput;

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "name, email, subject, and message are required" });
    return;
  }

  const result = createContact({ name, email, phone, subject, message });
  res.status(201).json({ success: true, id: result.id });
});