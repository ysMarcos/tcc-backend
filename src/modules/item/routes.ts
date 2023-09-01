import express from "express";
import { createItemController } from "./controller";

const router = express.Router();

router.post('/new', createItemController);

export default router;
