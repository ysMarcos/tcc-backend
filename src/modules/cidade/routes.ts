import express from "express";
import { createCidadeController, getCiadeByIdController, listCidadeController } from "./controller";

const router = express.Router();

router.post('/new', createCidadeController);
router.get('/list', listCidadeController);
router.get('/get/:id', getCiadeByIdController);

export default router;
