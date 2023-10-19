import express from "express";
import { addItemToVenda } from "./controllers";

const router = express.Router();

router.post('/:vendaId/', addItemToVenda);

export default router;
