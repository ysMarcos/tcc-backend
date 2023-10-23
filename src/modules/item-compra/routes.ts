import express from "express";
import { addItemToCompra } from "./controllers";

const router = express.Router();

router.post('/:compraId/', addItemToCompra);

export default router;
