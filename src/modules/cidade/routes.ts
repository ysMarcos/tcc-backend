import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { createCidade, getCidadeById, listCidade, updateCidade, deleteCidade } from "./controllers";

const router = express.Router();
const permission: string[] = ['create-cidade', 'get-cidade', 'update-cidade', 'delete-cidade']

router.post('/new', ensureAuthenticated, verifyPermission([permission[0]]), createCidade);
router.get('/list', ensureAuthenticated, verifyPermission([permission[1]]), listCidade);
router.get('/get/:id', ensureAuthenticated, verifyPermission([permission[1]]), getCidadeById);
router.put('/update/:id', ensureAuthenticated, verifyPermission([permission[2]]), updateCidade);
router.delete('/delete/:id', ensureAuthenticated, verifyPermission([permission[3]]), deleteCidade);

export default router;
