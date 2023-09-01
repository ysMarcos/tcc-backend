import express from "express";
import { addEnderecoToPessoa, getPessoaEndereco, removePessoaFromEndereco } from "./controller";

const router = express.Router();

router.post('/:pessoaId/endereco/:enderecoId/add', addEnderecoToPessoa);
router.get('/:pessoaId/endereco/list', getPessoaEndereco);
router.delete('/:pessoaId/endereco/:enderecoId/remove', removePessoaFromEndereco);


export default router;
