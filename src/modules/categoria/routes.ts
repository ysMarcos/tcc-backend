import express from "express";
import { createCategoria, getCategoriaById, listCategoria, updateCategoria } from "./controller";

const router = express.Router();

router.post('/new', createCategoria);
router.get('/get/:id', getCategoriaById);
router.get('/list', listCategoria);
router.put('/update/:id', updateCategoria);

export default router;
