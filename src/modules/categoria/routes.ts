import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { getCategoriaById, listCategoria, updateCategoria, createCategoria, deleteCategoria } from "./controllers";

const router = express.Router();
const permission: string[] = ['create-categoria', 'get-categoria', 'update-categoria', 'delete-categoria']

router.post('/new', ensureAuthenticated, verifyPermission([permission[0]]), createCategoria);
router.get('/get/:id', ensureAuthenticated, verifyPermission([permission[1]]), getCategoriaById);
router.get('/list', ensureAuthenticated, verifyPermission([permission[1]]), listCategoria);
router.put('/update/:id', ensureAuthenticated, verifyPermission([permission[2]]), updateCategoria);
router.delete('/delete/:id', ensureAuthenticated, verifyPermission([permission[3]]), deleteCategoria);

export default router;
