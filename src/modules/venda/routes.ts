import express from "express";
import { createVenda, getVendaById, listVenda, updateVenda, deleteVenda } from "./controllers";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";

const router = express.Router();
enum permissions {
    get = "get-venda",
    create = "create-venda",
    update = "update-venda",
    delete = "delete-venda"
}

router.post("/new", ensureAuthenticated, verifyPermission([permissions.create]), createVenda);
router.get("/list", ensureAuthenticated, verifyPermission([permissions.get]), listVenda);
router.get("/get/:id", ensureAuthenticated, verifyPermission([permissions.get]), getVendaById);
router.put("/update/:id", ensureAuthenticated, verifyPermission([permissions.update]), updateVenda);
router.delete("/delete/:id", ensureAuthenticated, verifyPermission([permissions.delete]), deleteVenda);

export default router;
