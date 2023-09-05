import express from "express";
import { createColaborador } from "./controller";
import { auth } from "./helpers/auth";

const router = express.Router();

router.post('/new', createColaborador);
router.post('/login', auth);

export default router;
