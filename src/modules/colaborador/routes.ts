import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { auth, refreshToken, createColaborador, getColaboradorById, listColaborador, updateColaborador, firstAccess } from "./controllers";

const router = express.Router();
enum permissions {
    create = 'create-colaborador',
    get = 'get-colaborador',
    update = 'update-colaborador',
    delete = 'delete-colaborador',
}

router.post("/", ensureAuthenticated, verifyPermission([permissions.create]), createColaborador);
router.post("/fa", firstAccess);
router.get("/", ensureAuthenticated, verifyPermission([permissions.get]), listColaborador);
router.get("/:id", ensureAuthenticated, verifyPermission([permissions.get]), getColaboradorById);
router.put("/:id", ensureAuthenticated, verifyPermission([permissions.update]), updateColaborador);
router.post("/auth", auth);
router.post("/refresh", refreshToken);

export default router;
