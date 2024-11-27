import {
  createClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
  searchClients,
} from "../controllers/clientController.js";
import express from "express";

const router = express.Router();

router.get("/clients", getClients);
router.post("/clients", createClient);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);
router.get("/clients/search", searchClients);
router.get("/:id", getClient);

export default router;
