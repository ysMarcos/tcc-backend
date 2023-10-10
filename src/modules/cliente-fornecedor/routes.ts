import express from "express";
import { /*createClienteFornecedor*/ deleteClienteFornecedor, /*listClienteFornecedor,*/ updateClienteFornecedor } from "./controller";
import { createClienteFornecedor, listClienteFornecedor, getClienteFornecedorById } from "./controllers";

const router = express.Router();

router.post("/new", createClienteFornecedor);
router.get("/list", listClienteFornecedor);
router.get("/get/:id", getClienteFornecedorById);
router.put("/update/:id", updateClienteFornecedor);
router.delete("/delete/:id", deleteClienteFornecedor);

export default router;
