import express from "express";
import { createColaborador } from "./controller";

const router = express.Router();

router.post('/new', createColaborador);

export default router;
