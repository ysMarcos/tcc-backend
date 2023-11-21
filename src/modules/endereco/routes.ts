import express from "express";
import { createEndereco, getEnderecoById, updateEndereco, deleteEndereco, getEnderecoByPessoaId } from "./controllers";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";

const router = express.Router();

enum permissions {
    get = "get-pessoa",
    create = "create-pessoa",
    update = "update-pessoa",
    delete = "delete-pessoa"
}

router.post('/:pessoaId', ensureAuthenticated, verifyPermission([permissions.create]), createEndereco);
router.get('/:id', ensureAuthenticated, verifyPermission([permissions.get]), getEnderecoById);
router.get('/pessoa/:pessoaId', ensureAuthenticated, verifyPermission([permissions.get]), getEnderecoByPessoaId);
router.put('/:id', ensureAuthenticated, verifyPermission([permissions.update]), updateEndereco);
router.delete('/:id', ensureAuthenticated, verifyPermission([permissions.delete]), deleteEndereco);

export default router;
