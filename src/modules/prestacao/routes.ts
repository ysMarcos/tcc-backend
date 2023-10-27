import express from "express";
import { createPrestacao, getPrestacaoById, listPrestacao, updatePrestacao, deletePrestacao } from "./controllers";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";

const router = express.Router();
enum permissions {
    get = "get-prestacao",
    create = "create-prestacao",
    update = "update-prestacao",
    delete = "delete-prestacao"
}

router.post("/", ensureAuthenticated, verifyPermission([permissions.create]), createPrestacao);
router.get("/", ensureAuthenticated, verifyPermission([permissions.get]), listPrestacao);
router.get("/:id", ensureAuthenticated, verifyPermission([permissions.get]), getPrestacaoById);
router.put("/:id", ensureAuthenticated, verifyPermission([permissions.update]), updatePrestacao);
router.delete("/:id", ensureAuthenticated, verifyPermission([permissions.delete]), deletePrestacao);

export default router;
