import express, { Response } from "express";

import cidadeRouter from "../modules/cidade/routes";
import pessoaRouter from "../modules/pessoa/routes";
import enderecoRouter from "../modules/endereco/routes";
import pessoaEnderecoRouter from "../modules/pessoa-endereco/routes";
import categoriaRouter from "../modules/categoria/routes";
import itemRouter from "../modules/item/routes";
import itemCategoriaRouter from "../modules/item-categoria/routes";
import colaboradorRouter from "../modules/colaborador/routes";
import permissaoRouter from "../modules/permissao/routes";
import permissaoColaboradorRouter from "../modules/permissao-colaborador/routes";
import clienteFornecedorRouter from "../modules/cliente-fornecedor/routes";
import vendaRouter from "../modules/venda/routes";
import itemVendaRouter from "../modules/item-venda/routes";
import compraRouter from "../modules/compra/routes";
import itemCompraRouter from "../modules/item-compra/routes";
import servicoRouter from "../modules/servico/routes";
import prestacaoRouter from "../modules/prestacao/routes";
import servicoPrestacaoRouter from "../modules/servico-prestacao/routes";

const router = express.Router();

router.use('/pessoa', pessoaRouter, pessoaEnderecoRouter);
router.use('/cidade', cidadeRouter);
router.use('/endereco', enderecoRouter);
router.use('/categoria', categoriaRouter, itemCategoriaRouter);
router.use('/item', itemRouter);
router.use('/colaborador', colaboradorRouter, permissaoColaboradorRouter);
router.use('/permissao', permissaoRouter);
router.use('/clientefornecedor', clienteFornecedorRouter);
router.use('/venda', vendaRouter, itemVendaRouter);
router.use('/compra', compraRouter, itemCompraRouter);
router.use('/servico', servicoRouter);
router.use('/prestacao', prestacaoRouter, servicoPrestacaoRouter);
router.get('/teste', (response: Response) => {
    response.send("A");
})

export default router;
