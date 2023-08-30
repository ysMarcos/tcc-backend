import express from "express";
import { createPessoaController, deletePessoaController, getPessoaByIdController, listPessoaController, updatePessoaController } from "./controller";

const pessoaRouter = express.Router();

pessoaRouter.post('/new', createPessoaController);
pessoaRouter.get('/list', listPessoaController);
pessoaRouter.get('/get/:id', getPessoaByIdController);
pessoaRouter.put('/update/:id', updatePessoaController);
pessoaRouter.delete('/delete/:id', deletePessoaController);

export default pessoaRouter;
