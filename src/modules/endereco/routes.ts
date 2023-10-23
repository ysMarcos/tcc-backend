import express from "express";
import { createEndereco, deleteEndereco, getEnderecoById, listEnderecos, updateEndereco } from "./controller";

const router = express.Router();

router.post('/', createEndereco);
router.get('/', listEnderecos);
router.get('/:id', getEnderecoById);
router.put('/:id', updateEndereco);
router.delete('/:id', deleteEndereco);

export default router;
