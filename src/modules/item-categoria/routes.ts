import express from "express";
import { addItemToCategoria, listItemCategoria, removeItemFromCategoria } from "./controller";

const router = express.Router();

router.post('/:categoriaId/item/:itemId/add', addItemToCategoria);
router.get('/:categoriaId/item/list', listItemCategoria);
router.delete('/:categoriaId/item/:itemId/remove', removeItemFromCategoria);

export default router;
