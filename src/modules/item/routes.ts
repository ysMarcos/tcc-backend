import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware.js";
import { verifyPermission } from "../../middlewares/permission-middleware.js";
import { deleteItem, getItemById, createItem, listItem, updateItem } from "./controllers";

const router = express.Router();
enum permissions {
    get = "get-item",
    create = "create-item",
    update = "update-item",
    delete = "delete-item"
}

router.post('/', ensureAuthenticated, verifyPermission([permissions.create]), createItem);
router.get('/:id', ensureAuthenticated, verifyPermission([permissions.get]), getItemById);
router.get('/', ensureAuthenticated, verifyPermission([permissions.get]), listItem);
router.put('/:id', ensureAuthenticated, verifyPermission([permissions.update]), updateItem);
router.delete('/:id', ensureAuthenticated, verifyPermission([permissions.delete]), deleteItem);

export default router;
