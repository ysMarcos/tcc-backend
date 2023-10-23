import express from "express";
import { addServicoToPrestacao } from "./controllers";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";

const router = express.Router();
enum permissions {
    create = "create-prestacao"
}

router.post("/:prestacaoId/servicos", ensureAuthenticated, verifyPermission([permissions.create]), addServicoToPrestacao);

export default router;
