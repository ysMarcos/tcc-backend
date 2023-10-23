import express from "express";
import { createPessoa, listPessoa, getPessoaById, updatePessoa, deletePessoa, firstAccess } from "./controllers";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";

const router = express.Router();
enum permissions {
    create = 'create-pessoa',
    get = 'get-pessoa',
    update = 'update-pessoa',
    delete = 'delete-pessoa',
}

router.post('/', ensureAuthenticated, verifyPermission([permissions.create]), createPessoa);
router.post('/fa', firstAccess);
router.get('/', ensureAuthenticated, verifyPermission([permissions.get]), listPessoa);
router.get('/:id', ensureAuthenticated, verifyPermission([permissions.get]), getPessoaById);
router.put('/:id', ensureAuthenticated, verifyPermission([permissions.update]), updatePessoa);
router.delete('/:id', ensureAuthenticated, verifyPermission([permissions.delete]), deletePessoa);

export default router;
