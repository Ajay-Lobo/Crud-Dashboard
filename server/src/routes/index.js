import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} from "../controllers/clientController.js";
import express from "express";

const router = express.Router();

router.get("/clients", getClients);
router.post("/clients", createClient);
router.put("/clients/:id", updateClient);
router.delete("/clients/:id", deleteClient);

export default router;
