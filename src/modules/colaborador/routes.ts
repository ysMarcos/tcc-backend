import express from "express";
import { createColaborador, getColaboradorById, listColaborador, updateColaborador } from "./controller";
import { auth } from "./auth";

const router = express.Router();

router.post('/new', createColaborador);
router.post('/auth', auth);
router.get("/list", listColaborador);
router.get("/get/:id", getColaboradorById);
router.put("/update/:id", updateColaborador);

export default router;
