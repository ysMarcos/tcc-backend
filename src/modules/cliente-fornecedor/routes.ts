import express from "express";
import { createClienteFornecedor, deleteClienteFornecedor, getClienteFornecedorById, listClienteFornecedor, updateClienteFornecedor } from "./controller";

const router = express.Router();

router.post("/new", createClienteFornecedor);
router.get("/list", listClienteFornecedor);
router.get("/get/:id", getClienteFornecedorById);
router.put("/update/:id", updateClienteFornecedor);
router.delete("/delete/:id", deleteClienteFornecedor);

export default router;
