import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware.js";
import { verifyPermission } from "../../middlewares/permission-middleware.js";
import { deleteItem, getItemById, createItem, listItem, updateItem } from "./controllers";

const router = express.Router();

router.post('/new', ensureAuthenticated, verifyPermission(['admin','create-item']), createItem);
router.get('/get/:id', ensureAuthenticated, verifyPermission(['admin','get-item']), getItemById);
router.get('/list', ensureAuthenticated, verifyPermission(['admin','get-item']), listItem);
router.put('/update/:id', ensureAuthenticated, verifyPermission(['admin', 'update-item']), updateItem);
router.delete('/delete/:id', ensureAuthenticated, verifyPermission(['admin', 'delete-item']), deleteItem);

export default router;
