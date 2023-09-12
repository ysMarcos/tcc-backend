import express from "express";
import { addPermissaoToColaborador } from "./controller";

const router = express.Router();

router.post("/:userId/permissions", addPermissaoToColaborador);

export default router;
