import express from "express";
import { addEnderecoToPessoaController, removePessoaFromEnderecoController } from "./controller";

const router = express.Router();

router.post('/:pessoaId/endereco/:enderecoId/add', addEnderecoToPessoaController);
router.delete('/:pessoaId/endereco/:enderecoId/remove', removePessoaFromEnderecoController);

export default router;
