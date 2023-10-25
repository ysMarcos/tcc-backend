import express from "express";
import { addItemToVenda } from "./controllers";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";

const router = express.Router();

enum permissions {
    create = "create-venda"
}

router.post('/:vendaId/', ensureAuthenticated, verifyPermission([permissions.create]), addItemToVenda);

export default router;
