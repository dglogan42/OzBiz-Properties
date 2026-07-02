export type PropertyType = "office" | "retail" | "warehouse" | "industrial" | "mixed-use";
export type ListingType = "lease" | "sale";

export interface Agent {
  name: string;
  phone: string;
  email: string;
}

export interface Property {
  id: string;
  title: string;
  address: string;
  suburb: string;
  state: string;
  postcode: string;
  type: PropertyType;
  listingType: ListingType;
  price: number;
  priceUnit: "sqm/year" | "total";
  area: number;
  parking: number;
  floors: number;
  featured: boolean;
  description: string;
  amenities: string[];
  agent: Agent;
  image: string;
}

export interface PropertyFilters {
  query?: string;
  state?: string;
  type?: string;
  listingType?: string;
  minArea?: string;
  maxPrice?: string;
  featured?: string;
}

export interface EnquiryInput {
  propertyId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactInput {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export interface Stats {
  totalListings: number;
  states: number;
  propertyTypes: number;
  featured: number;
}