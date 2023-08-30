import express from "express";
import { createEnderecoController, deleteEnderecoController, getEnderecoByIdController, listEnderecosController, updateEnderecoController } from "./controller";

const router = express.Router();

router.post('/new', createEnderecoController);
router.get('/list', listEnderecosController);
router.get('/get/:id', getEnderecoByIdController);
router.put('/update/:id', updateEnderecoController);
router.delete('/delete/:id', deleteEnderecoController);

export default router;
