import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { createPermissao, deletePermissao, getPermissaoById, listPermissao, updatePermissao } from "./controllers";

const router = express.Router();

router.post("/new", ensureAuthenticated, verifyPermission([]), createPermissao);
router.get("/list", ensureAuthenticated, verifyPermission([]), listPermissao);
router.get("/get/:id", ensureAuthenticated, verifyPermission([]), getPermissaoById);
router.put("/update/:id", ensureAuthenticated, verifyPermission([]),updatePermissao);
router.delete("/delete/:id", ensureAuthenticated, verifyPermission([]),deletePermissao);

export default router;
