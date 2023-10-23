import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { getServicoById, listServico, updateServico, createServico, deleteServico } from "./controllers";

const router = express.Router();
enum permissions {
    create = "create-servico",
    get = "get-servico",
    update = "update-servico",
    delete = "delete-servico"
}
//TODO: Fazer validadores para o insert
router.post('/', ensureAuthenticated, verifyPermission([permissions.create]), createServico);
router.get('/:id', ensureAuthenticated, verifyPermission([permissions.get]), getServicoById);
router.get('/', ensureAuthenticated, verifyPermission([permissions.get]), listServico);
router.put('/:id', ensureAuthenticated, verifyPermission([permissions.update]), updateServico);
router.delete('/:id', ensureAuthenticated, verifyPermission([permissions.delete]), deleteServico);

export default router;
