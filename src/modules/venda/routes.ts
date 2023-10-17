import express from "express";
import { createVenda, getVendaById, listVenda, updateVenda, deleteVenda } from "./controllers";

const router = express.Router();

router.post("/new", createVenda);
router.get("/list", listVenda);
router.get("/get/:id", getVendaById);
router.put("/update/:id", updateVenda);
router.delete("/delete/:id", deleteVenda);

export default router;
