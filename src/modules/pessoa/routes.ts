import express from "express";
import { createPessoa, deletePessoa, getPessoaById, listPessoa, updatePessoa } from "./controller";

const router = express.Router();

router.post('/new', createPessoa);
router.get('/list', listPessoa);
router.get('/get/:id', getPessoaById);
router.put('/update/:id', updatePessoa);
router.delete('/delete/:id', deletePessoa);

export default router;
