import express from "express";
import { createPessoaController, deletePessoaController, getPessoaByIdController, listPessoaController, updatePessoaController } from "./controller";

const router = express.Router();

router.post('/new', createPessoaController);
router.get('/list', listPessoaController);
router.get('/get/:id', getPessoaByIdController);
router.put('/update/:id', updatePessoaController);
router.delete('/delete/:id', deletePessoaController);

export default router;
