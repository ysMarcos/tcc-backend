import express from "express";
import { createEndereco, getEnderecoById, updateEndereco, deleteEndereco } from "./controllers";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";

const router = express.Router();

enum permissions {
    get = "get-endereco",
    create = "create-endereco",
    update = "update-endereco",
    delete = "delete-endereco"
}

router.post('/', ensureAuthenticated, verifyPermission([permissions.create]), createEndereco);
router.get('/:id', ensureAuthenticated, verifyPermission([permissions.get]), getEnderecoById);
router.put('/:id', ensureAuthenticated, verifyPermission([permissions.update]), updateEndereco);
router.delete('/:id', ensureAuthenticated, verifyPermission([permissions.delete]), deleteEndereco);

export default router;
