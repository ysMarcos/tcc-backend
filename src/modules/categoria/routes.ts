import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { getCategoriaById, listCategoria, updateCategoria, createCategoria, deleteCategoria } from "./controllers";

const router = express.Router();
enum permissions {
    get = "get-categoria",
    create = "create-categoria",
    update = "update-categoria",
    delete = "delete-categoria"
}

router.post('/', ensureAuthenticated, verifyPermission([permissions.create]), createCategoria);
router.get('/:id', ensureAuthenticated, verifyPermission([permissions.get]), getCategoriaById);
router.get('/', ensureAuthenticated, verifyPermission([permissions.get]), listCategoria);
router.put('/:id', ensureAuthenticated, verifyPermission([permissions.update]), updateCategoria);
router.delete('/:id', ensureAuthenticated, verifyPermission([permissions.delete]), deleteCategoria);

export default router;
