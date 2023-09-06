import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { createItem, deleteItem, getItemById, listItem, updateItem } from "./controller";

const router = express.Router();

router.post('/new', createItem);
router.get('/get/:id', getItemById);
router.get('/list',ensureAuthenticated, listItem);
router.put('/update/:id', updateItem);
router.delete('/delete/:id', deleteItem);

export default router;
