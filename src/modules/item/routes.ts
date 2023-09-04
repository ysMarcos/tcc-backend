import express from "express";
import { createItem, deleteItem, getItemById, listItem, updateItem } from "./controller";

const router = express.Router();

router.post('/new', createItem);
router.get('/get/:id', getItemById);
router.get('/list', listItem);
router.put('/update/:id', updateItem);
router.delete('/delete/:id', deleteItem);

export default router;
