import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { getUnidadeDeMedidaById, createUnidadeDeMedida, updateUnidadeMedida, listUnidadeMedida, deleteUnidadeMedida } from "./controllers";

const router = express.Router();
enum permissions {
    create = "create-unidade-medida",
    get = "get-unidade-medida",
    update = "update-unidade-medida",
    delete = "delete-unidade-medida"
}

router.post('/new', ensureAuthenticated, verifyPermission([permissions.create]), createUnidadeDeMedida);
router.get('/get/:id', ensureAuthenticated, verifyPermission([permissions.get]), getUnidadeDeMedidaById);
router.get('/list', ensureAuthenticated, verifyPermission([permissions.get]), listUnidadeMedida);
router.put('/update/:id', ensureAuthenticated, verifyPermission([permissions.update]), updateUnidadeMedida);
router.delete('/delete/:id', ensureAuthenticated, verifyPermission([permissions.delete]), deleteUnidadeMedida);

export default router;
