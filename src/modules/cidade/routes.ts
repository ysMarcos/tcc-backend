import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { createCidade, getCidadeById, listCidade, updateCidade, deleteCidade } from "./controllers";

const router = express.Router();
enum permissions {
    get = "get-pessoa",
    create = "create-pessoa",
    update = "update-pessoa",
    delete = "delete-pessoa"
}

router.post('/', ensureAuthenticated, verifyPermission([permissions.create]), createCidade);
router.get('/', ensureAuthenticated, verifyPermission([permissions.get]), listCidade);
router.get('/:id', ensureAuthenticated, verifyPermission([permissions.get]), getCidadeById);
router.put('/:id', ensureAuthenticated, verifyPermission([permissions.update]), updateCidade);
router.delete('/:id', ensureAuthenticated, verifyPermission([permissions.delete]), deleteCidade);

export default router;
