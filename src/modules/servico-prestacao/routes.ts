import express from "express";
import { addServicoToPrestacao, deleteServicoPrestacao, getServicoFromPrestacao, listServicoPrestacao, updateServicoPrestacao } from "./controllers";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
const router = express.Router();
enum permissions {
    create = "create-prestacao",
    get = "get-prestacao",
    update = "update-prestacao",
    delete = "delete-prestacao"
}

router.post("/:id/servicos", ensureAuthenticated, verifyPermission([permissions.create]), addServicoToPrestacao);
router.get("/:id/servicos", ensureAuthenticated, verifyPermission([permissions.get]), listServicoPrestacao);
router.get("/:id/servicos/:servicoId", ensureAuthenticated, verifyPermission([permissions.get]), getServicoFromPrestacao);
router.put("/servicos/:id", ensureAuthenticated, verifyPermission([permissions.update]), updateServicoPrestacao);
router.delete("/:id/servicos/:servicoId", ensureAuthenticated, verifyPermission([permissions.delete]), deleteServicoPrestacao);

export default router;
