import express from "express";
import { addServicoToPrestacao, getServicoFromPrestacao, listServicoPrestacao, updateServicoPrestacao } from "./controllers";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
const router = express.Router();
enum permissions {
    create = "create-prestacao",
    get = "get-prestacao",
    update = "update-prestacao"
}

router.post("/:id/servicos", ensureAuthenticated, verifyPermission([permissions.create]), addServicoToPrestacao);
router.get("/:id/servicos", ensureAuthenticated, verifyPermission([permissions.get]), listServicoPrestacao);
router.get("/:id/servicos/:servicoId", ensureAuthenticated, verifyPermission([permissions.get]), getServicoFromPrestacao);
router.put("/:id/servicos/:servicoId", ensureAuthenticated, verifyPermission([permissions.update]), updateServicoPrestacao);

export default router;
