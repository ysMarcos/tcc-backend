import express from "express";
import { createItem } from "./controller";

const router = express.Router();

router.post('/new', createItem);

export default router;
