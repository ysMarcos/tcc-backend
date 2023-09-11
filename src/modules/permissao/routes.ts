import express from "express";
import { createPermissao } from "./controller";

const router = express.Router();

router.post("/new", createPermissao);

export default router;
