import { Router } from "express";
import { createEnquiry } from "../db.js";
import type { EnquiryInput } from "../types.js";

export const enquiriesRouter = Router();

enquiriesRouter.post("/", (req, res) => {
  const { propertyId, name, email, phone, message } = req.body as EnquiryInput;

  if (!propertyId || !name || !email || !message) {
    res.status(400).json({ error: "propertyId, name, email, and message are required" });
    return;
  }

  try {
    const result = createEnquiry({ propertyId, name, email, phone, message });
    res.status(201).json({ success: true, id: result.id });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Failed to create enquiry";
    res.status(400).json({ error: msg });
  }
});