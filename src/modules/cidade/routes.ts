import express from "express";
import { createCidade, getCiadeById, listCidade } from "./controller";

const router = express.Router();

router.post('/new', createCidade);
router.get('/list', listCidade);
router.get('/get/:id', getCiadeById);

export default router;
