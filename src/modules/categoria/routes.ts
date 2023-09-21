import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { getCategoriaById, listCategoria, updateCategoria } from "./controller";
import { createCategoria } from "./controllers/create-categoria";

const router = express.Router();

router.post('/new', ensureAuthenticated, verifyPermission(['admin','create-categoria']), createCategoria);
router.get('/get/:id', ensureAuthenticated, verifyPermission(['admin','get-categoria']), getCategoriaById);
router.get('/list', ensureAuthenticated, verifyPermission(['admin','get-categoria']), listCategoria);
router.put('/update/:id', ensureAuthenticated, verifyPermission(['admin','update-categoria']), updateCategoria);

export default router;
