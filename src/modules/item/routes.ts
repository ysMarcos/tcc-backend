import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware.js";
import { verifyPermission } from "../../middlewares/permission-middleware.js";
import { deleteItem, getItemById, createItem, listItem, updateItem } from "./controllers";

const router = express.Router();
const permission: string[] = ['create-item', 'get-item', 'update-item', 'delete-item'];

router.post('/new', ensureAuthenticated, verifyPermission([permission[0]]), createItem);
router.get('/get/:id', ensureAuthenticated, verifyPermission([permission[1]]), getItemById);
router.get('/list', ensureAuthenticated, verifyPermission([permission[1]]), listItem);
router.put('/update/:id', ensureAuthenticated, verifyPermission([permission[2]]), updateItem);
router.delete('/delete/:id', ensureAuthenticated, verifyPermission([permission[3]]), deleteItem);

export default router;
