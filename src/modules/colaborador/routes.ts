import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { auth, refreshToken, createColaborador, getColaboradorById, listColaborador, updateColaborador } from "./controllers";

const router = express.Router();
enum permissions {
    create = 'create-colaborador',
    get = 'get-colaborador',
    update = 'update-colaborador',
    delete = 'delete-colaborador',
}

router.post("/new", ensureAuthenticated, verifyPermission([permissions.create]), createColaborador);
router.post("/firstaccess", createColaborador);
router.get("/list", ensureAuthenticated, verifyPermission([permissions.get]), listColaborador);
router.get("/get/:id", ensureAuthenticated, verifyPermission([permissions.get]), getColaboradorById);
router.put("/update/:id", ensureAuthenticated, verifyPermission([permissions.update]), updateColaborador);
router.post("/auth", auth);
router.post("/refresh", refreshToken);

export default router;
