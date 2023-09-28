import express from "express";
import { createPessoa } from "./controllers"
import { deletePessoa, getPessoaById, listPessoa, updatePessoa } from "./controller";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";

const router = express.Router();
const permission = ['create-pessoa', 'get-pessoa', 'update-pessoa', 'delete-pessoa'];

router.post('/new', ensureAuthenticated, verifyPermission([permission[0]]), createPessoa);
router.get('/list', listPessoa);
router.get('/get/:id', getPessoaById);
router.put('/update/:id', updatePessoa);
router.delete('/delete/:id', deletePessoa);

export default router;
