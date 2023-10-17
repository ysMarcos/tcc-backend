import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { createClienteFornecedor, listClienteFornecedor, getClienteFornecedorById, updateClienteFornecedor, deleteClienteFornecedor } from "./controllers";

const router = express.Router();
enum permissions {
    create = "create-clifor",
    get = "get-clifor",
    update = "update-clifor",
    delete = "delete-clifor"
}
router.post("/new", ensureAuthenticated, verifyPermission([permissions.create]), createClienteFornecedor);
router.get("/list", ensureAuthenticated, verifyPermission([permissions.get]), listClienteFornecedor);
router.get("/get/:id", ensureAuthenticated, verifyPermission([permissions.get]), getClienteFornecedorById);
router.put("/update/:id", ensureAuthenticated, verifyPermission([permissions.update]), updateClienteFornecedor);
router.delete("/delete/:id", ensureAuthenticated, verifyPermission([permissions.delete]), deleteClienteFornecedor);

export default router;
