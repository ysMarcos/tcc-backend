import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { addPermissaoToColaborador } from "./controller";

const router = express.Router();

router.post("/:userId/permissions", /*ensureAuthenticated, verifyPermission([]),*/ addPermissaoToColaborador);

export default router;
