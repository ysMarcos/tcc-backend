import express from "express";
import { createCompra, getCompraById, listCompra, updateVenda, deleteCompra } from "./controllers";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";

const router = express.Router();
enum permissions {
    get = "get-compra",
    create = "create-compra",
    update = "update-compra",
    delete = "delete-compra"
}

router.post("/", ensureAuthenticated, verifyPermission([permissions.create]), createCompra);
router.get("/", ensureAuthenticated, verifyPermission([permissions.get]), listCompra);
router.get("/:id", ensureAuthenticated, verifyPermission([permissions.get]), getCompraById);
router.put("/:id", ensureAuthenticated, verifyPermission([permissions.update]), updateVenda);
router.delete("/:id", ensureAuthenticated, verifyPermission([permissions.delete]), deleteCompra);

export default router;
