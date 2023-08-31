import express from "express";
import { addEnderecoToPessoaController, getPessoaEnderecoController, removePessoaFromEnderecoController } from "./controller";

const router = express.Router();

router.post('/:pessoaId/endereco/:enderecoId/add', addEnderecoToPessoaController);
router.get('/:pessoaId/endereco/list', getPessoaEnderecoController);
router.delete('/:pessoaId/endereco/:enderecoId/remove', removePessoaFromEnderecoController);


export default router;
