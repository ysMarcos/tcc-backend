import express from "express";
import { addItemToCompra } from "./controllers";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";

const router = express.Router();

enum permissions {
    create = "create-compra"
}

router.post('/:compraId/', ensureAuthenticated, verifyPermission([permissions.create]),addItemToCompra);

export default router;
