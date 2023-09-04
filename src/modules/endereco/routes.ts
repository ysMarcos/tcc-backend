import express from "express";
import { createEndereco, deleteEndereco, getEnderecoById, listEnderecos, updateEndereco } from "./controller";

const router = express.Router();

router.post('/new', createEndereco);
router.get('/list', listEnderecos);
router.get('/get/:id', getEnderecoById);
router.put('/update/:id', updateEndereco);
router.delete('/delete/:id', deleteEndereco);

export default router;
