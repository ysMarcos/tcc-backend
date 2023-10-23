import express from "express";
import { createPessoa, listPessoa, getPessoaById, updatePessoa, deletePessoa } from "./controllers";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";

const router = express.Router();
enum permissions {
    create = 'create-pessoa',
    get = 'get-pessoa',
    update = 'update-pessoa',
    delete = 'delete-pessoa',
}

router.post('/new', ensureAuthenticated, verifyPermission([permissions.create]), createPessoa);
router.post('/firstaccess', createPessoa);
router.get('/list', ensureAuthenticated, verifyPermission([permissions.get]), listPessoa);
router.get('/get/:id', ensureAuthenticated, verifyPermission([permissions.get]), getPessoaById);
router.put('/update/:id', ensureAuthenticated, verifyPermission([permissions.update]), updatePessoa);
router.delete('/delete/:id', ensureAuthenticated, verifyPermission([permissions.delete]), deletePessoa);

export default router;
