import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware.js";
import { verifyPermission } from "../../middlewares/permission-middleware.js";
import { createItem, deleteItem, getItemById, listItem, updateItem } from "./controller.js";
import { getItemByIdTest } from "./controllers/get-item-by-id.js";
import { insertItemTest } from "./controllers/insert-item.js";
import { listItemTest } from "./controllers/list-item.js";
import { updateItemTest } from "./controllers/update-item.js";

const router = express.Router();

router.post('/new', createItem);
router.post('/new/test', ensureAuthenticated, verifyPermission(['admin','create-item']), insertItemTest);
router.get('/get/:id', getItemById);
router.get('/get/:id/test', ensureAuthenticated, verifyPermission(['admin','get-item']), getItemByIdTest);
router.get('/list', ensureAuthenticated, verifyPermission(['admin','get-item']), listItem);
router.get('/list/test', listItemTest);
router.put('/update/:id', updateItem);
router.put('/update/:id/test', ensureAuthenticated, verifyPermission(['admin', 'update-item']), updateItemTest);
router.delete('/delete/:id', deleteItem);

export default router;
