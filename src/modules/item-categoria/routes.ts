import express from "express";
import { addItemToCategoria, removeItemFromCategoria } from "./controllers";

const router = express.Router();

router.post('/categoria', addItemToCategoria);
router.delete('/categoria/delete', removeItemFromCategoria);

export default router;
