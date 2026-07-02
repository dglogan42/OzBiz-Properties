import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SEED_PROPERTIES } from "./seed/properties.js";
import type { ContactInput, EnquiryInput, Property, PropertyFilters, Stats } from "./types.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../data");
const DB_PATH = path.join(DATA_DIR, "ozbiz.db");

let db: Database.Database;

function rowToProperty(row: Record<string, unknown>): Property {
  return {
    id: row.id as string,
    title: row.title as string,
    address: row.address as string,
    suburb: row.suburb as string,
    state: row.state as string,
    postcode: row.postcode as string,
    type: row.type as Property["type"],
    listingType: row.listing_type as Property["listingType"],
    price: row.price as number,
    priceUnit: row.price_unit as Property["priceUnit"],
    area: row.area as number,
    parking: row.parking as number,
    floors: row.floors as number,
    featured: Boolean(row.featured),
    description: row.description as string,
    amenities: JSON.parse(row.amenities as string) as string[],
    agent: {
      name: row.agent_name as string,
      phone: row.agent_phone as string,
      email: row.agent_email as string,
    },
    image: row.image as string,
  };
}

export function initDatabase(): Database.Database {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  db.exec(`
    CREATE TABLE IF NOT EXISTS properties (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      address TEXT NOT NULL,
      suburb TEXT NOT NULL,
      state TEXT NOT NULL,
      postcode TEXT NOT NULL,
      type TEXT NOT NULL,
      listing_type TEXT NOT NULL,
      price REAL NOT NULL,
      price_unit TEXT NOT NULL,
      area INTEGER NOT NULL,
      parking INTEGER NOT NULL,
      floors INTEGER NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      description TEXT NOT NULL,
      amenities TEXT NOT NULL,
      agent_name TEXT NOT NULL,
      agent_phone TEXT NOT NULL,
      agent_email TEXT NOT NULL,
      image TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      property_id TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      FOREIGN KEY (property_id) REFERENCES properties(id)
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);

  const count = db.prepare("SELECT COUNT(*) as count FROM properties").get() as { count: number };
  if (count.count === 0) {
    seedProperties();
  }

  return db;
}

export function seedProperties(): void {
  const insert = db.prepare(`
    INSERT INTO properties (
      id, title, address, suburb, state, postcode, type, listing_type,
      price, price_unit, area, parking, floors, featured, description,
      amenities, agent_name, agent_phone, agent_email, image
    ) VALUES (
      @id, @title, @address, @suburb, @state, @postcode, @type, @listingType,
      @price, @priceUnit, @area, @parking, @floors, @featured, @description,
      @amenities, @agentName, @agentPhone, @agentEmail, @image
    )
  `);

  const seed = db.transaction((properties: Property[]) => {
    for (const p of properties) {
      insert.run({
        id: p.id,
        title: p.title,
        address: p.address,
        suburb: p.suburb,
        state: p.state,
        postcode: p.postcode,
        type: p.type,
        listingType: p.listingType,
        price: p.price,
        priceUnit: p.priceUnit,
        area: p.area,
        parking: p.parking,
        floors: p.floors,
        featured: p.featured ? 1 : 0,
        description: p.description,
        amenities: JSON.stringify(p.amenities),
        agentName: p.agent.name,
        agentPhone: p.agent.phone,
        agentEmail: p.agent.email,
        image: p.image,
      });
    }
  });

  seed(SEED_PROPERTIES);
  console.log(`Seeded ${SEED_PROPERTIES.length} properties`);
}

export function getProperties(filters: PropertyFilters = {}): Property[] {
  let sql = "SELECT * FROM properties WHERE 1=1";
  const params: Record<string, string | number> = {};

  if (filters.featured === "true") {
    sql += " AND featured = 1";
  }
  if (filters.state) {
    sql += " AND state = @state";
    params.state = filters.state;
  }
  if (filters.type) {
    sql += " AND type = @type";
    params.type = filters.type;
  }
  if (filters.listingType) {
    sql += " AND listing_type = @listingType";
    params.listingType = filters.listingType;
  }
  if (filters.minArea) {
    sql += " AND area >= @minArea";
    params.minArea = Number(filters.minArea);
  }
  if (filters.maxPrice) {
    sql += " AND (price_unit = 'total' OR price <= @maxPrice)";
    params.maxPrice = Number(filters.maxPrice);
  }

  sql += " ORDER BY featured DESC, title ASC";

  const rows = db.prepare(sql).all(params) as Record<string, unknown>[];
  let properties = rows.map(rowToProperty);

  if (filters.query) {
    const q = filters.query.toLowerCase();
    properties = properties.filter((p) => {
      const haystack = `${p.title} ${p.address} ${p.suburb} ${p.state} ${p.description}`.toLowerCase();
      return haystack.includes(q);
    });
  }

  return properties;
}

export function getPropertyById(id: string): Property | undefined {
  const row = db.prepare("SELECT * FROM properties WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  return row ? rowToProperty(row) : undefined;
}

export function getStats(): Stats {
  const total = db.prepare("SELECT COUNT(*) as count FROM properties").get() as { count: number };
  const states = db.prepare("SELECT COUNT(DISTINCT state) as count FROM properties").get() as { count: number };
  const types = db.prepare("SELECT COUNT(DISTINCT type) as count FROM properties").get() as { count: number };
  const featured = db.prepare("SELECT COUNT(*) as count FROM properties WHERE featured = 1").get() as { count: number };

  return {
    totalListings: total.count,
    states: states.count,
    propertyTypes: types.count,
    featured: featured.count,
  };
}

export function createEnquiry(input: EnquiryInput): { id: number } {
  const property = getPropertyById(input.propertyId);
  if (!property) {
    throw new Error("Property not found");
  }

  const result = db
    .prepare(
      `INSERT INTO enquiries (property_id, name, email, phone, message)
       VALUES (@propertyId, @name, @email, @phone, @message)`
    )
    .run({
      propertyId: input.propertyId,
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      message: input.message,
    });

  return { id: Number(result.lastInsertRowid) };
}

export function createContact(input: ContactInput): { id: number } {
  const result = db
    .prepare(
      `INSERT INTO contacts (name, email, phone, subject, message)
       VALUES (@name, @email, @phone, @subject, @message)`
    )
    .run({
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      subject: input.subject,
      message: input.message,
    });

  return { id: Number(result.lastInsertRowid) };
}