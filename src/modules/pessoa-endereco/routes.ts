import express from "express";
import { addEnderecoToPessoa, listPessoaEndereco, removePessoaFromEndereco } from "./controllers";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";

const router = express.Router();
enum permissions {
    create = "create-endereco",
    get = "get-endereco",
    delete = "delete-endereco"
}

router.post('/:pessoaId/endereco/', ensureAuthenticated, verifyPermission([permissions.create]), addEnderecoToPessoa);
router.get('/:pessoaId/endereco/', ensureAuthenticated, verifyPermission([permissions.get]), listPessoaEndereco);
router.delete('/:pessoaId/endereco/', ensureAuthenticated, verifyPermission([permissions.delete]), removePessoaFromEndereco);


export default router;
