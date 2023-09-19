import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware.js";
import { verifyPermission } from "../../middlewares/permission-middleware.js";
import { createItem, deleteItem, getItemById, listItem, updateItem } from "./controller.js";
import { listItemTest } from "./controllers-test/list-item.js";

const router = express.Router();

router.post('/new', createItem);
router.get('/get/:id', getItemById);
router.get('/list', ensureAuthenticated, verifyPermission(['get-item']), listItem);
router.get('/list/test', listItemTest);
router.put('/update/:id', updateItem);
router.delete('/delete/:id', deleteItem);

export default router;
