import express from "express";
import { addItemToCategoria, removeItemFromCategoria } from "./controllers";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";

const router = express.Router();

enum permissions {
    create = "create-item",
    delete = "delete-item"
}

router.post('/categoria', ensureAuthenticated, verifyPermission([permissions.create]), addItemToCategoria);
router.delete('/categoria/delete', ensureAuthenticated, verifyPermission([permissions.delete]), removeItemFromCategoria);

export default router;
