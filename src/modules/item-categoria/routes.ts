import express from "express";
import { addItemToCategoria, removeItemFromCategoria } from "./controllers";

const router = express.Router();

router.post('/categoria/', addItemToCategoria);
router.delete('/:categoriaId/item/:itemId/remove', removeItemFromCategoria);

export default router;
