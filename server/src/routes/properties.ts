import { Router } from "express";
import { getProperties, getPropertyById, getStats } from "../db.js";
import type { PropertyFilters } from "../types.js";

export const propertiesRouter = Router();

propertiesRouter.get("/stats", (_req, res) => {
  res.json(getStats());
});

propertiesRouter.get("/", (req, res) => {
  const filters: PropertyFilters = {
    query: req.query.query as string | undefined,
    state: req.query.state as string | undefined,
    type: req.query.type as string | undefined,
    listingType: req.query.listingType as string | undefined,
    minArea: req.query.minArea as string | undefined,
    maxPrice: req.query.maxPrice as string | undefined,
    featured: req.query.featured as string | undefined,
  };

  res.json(getProperties(filters));
});

propertiesRouter.get("/:id", (req, res) => {
  const property = getPropertyById(req.params.id);
  if (!property) {
    res.status(404).json({ error: "Property not found" });
    return;
  }
  res.json(property);
});