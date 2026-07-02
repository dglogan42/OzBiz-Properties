import { api } from "./client";

export interface EnquiryPayload {
  propertyId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export function submitEnquiry(payload: EnquiryPayload): Promise<{ success: boolean; id: number }> {
  return api.post("/enquiries", payload);
}

export function submitContact(payload: ContactPayload): Promise<{ success: boolean; id: number }> {
  return api.post("/contacts", payload);
}