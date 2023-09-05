import express from "express";
import { createColaborador } from "./controller";
import { auth } from "./auth";

const router = express.Router();

router.post('/new', createColaborador);
router.post('/auth', auth);

export default router;
