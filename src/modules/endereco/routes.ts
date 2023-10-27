import express from "express";
import { createEndereco, deleteEndereco, getEnderecoById, listEnderecos, updateEndereco } from "./controller";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
//TODO: Atualizar CRUD Endereco
const router = express.Router();

enum permissions {
    get = "get-endereco",
    create = "create-endereco",
    update = "update-endereco",
    delete = "delete-endereco"
}

router.post('/', ensureAuthenticated, verifyPermission([permissions.create]), createEndereco);
router.get('/', ensureAuthenticated, verifyPermission([permissions.get]), listEnderecos);
router.get('/:id', ensureAuthenticated, verifyPermission([permissions.get]), getEnderecoById);
router.put('/:id', ensureAuthenticated, verifyPermission([permissions.update]), updateEndereco);
router.delete('/:id', ensureAuthenticated, verifyPermission([permissions.delete]), deleteEndereco);

export default router;
