import express from "express";
import { createCategoriaController, getCategoriaByIdController, listCategoriaController, updateCategoriaController } from "./controller";

const router = express.Router();

router.post('/new', createCategoriaController);
router.get('/get/:id', getCategoriaByIdController);
router.get('/list', listCategoriaController);
router.put('/update/:id', updateCategoriaController);

export default router;
