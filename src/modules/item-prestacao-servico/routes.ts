import express from "express";
import { ensureAuthenticated } from "../../middlewares/auth-middleware";
import { verifyPermission } from "../../middlewares/permission-middleware";
import { addItemToPrestacaoServico } from "./controllers/add-item-to-prestacao";
import { listItemServico } from "./controllers/list-item-prestacao";
import { updateItemServico } from "./controllers/update-item-prestacao";
import { deleteItemPrestacao } from "./controllers/delete-item-prestacao";
const router = express.Router();
enum permissions {
    create = "create-prestacao",
    get = "get-prestacao",
    update = "update-prestacao",
    delete = "delete-prestacao"
}

router.post("/:id/servicos/:servicoId/itens", ensureAuthenticated, verifyPermission([permissions.create]), addItemToPrestacaoServico);
router.get("/:id/servicos/:servicoId/itens", ensureAuthenticated, verifyPermission([permissions.get]), listItemServico);
router.put("/:id/servicos/:servicoId/itens/:itemServicoId", ensureAuthenticated, verifyPermission([permissions.update]), updateItemServico);
router.delete("/:id/servicos/:servicoId/itens/:itemServicoId", ensureAuthenticated, verifyPermission([permissions.delete]), deleteItemPrestacao);


export default router;
