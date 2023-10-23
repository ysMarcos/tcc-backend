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

router.post("/new", ensureAuthenticated, verifyPermission([permissions.create]), createCompra);
router.get("/list", ensureAuthenticated, verifyPermission([permissions.get]), listCompra);
router.get("/get/:id", ensureAuthenticated, verifyPermission([permissions.get]), getCompraById);
router.put("/update/:id", ensureAuthenticated, verifyPermission([permissions.update]), updateVenda);
router.delete("/delete/:id", ensureAuthenticated, verifyPermission([permissions.delete]), deleteCompra);

export default router;
