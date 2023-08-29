import express from "express";
import { createPessoaController } from "./controller";

const router = express.Router();

router.post('/new', createPessoaController);

export default router;
