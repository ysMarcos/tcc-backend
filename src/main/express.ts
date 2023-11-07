import express from "express";

import pessoaRouter from "../modules/pessoa/routes";
import enderecoRouter from "../modules/endereco/routes";
import pessoaEnderecoRouter from "../modules/pessoa-endereco/routes";
import categoriaRouter from "../modules/categoria/routes";
import itemRouter from "../modules/item/routes";
import itemCategoriaRouter from "../modules/item-categoria/routes";
import colaboradorRouter from "../modules/colaborador/routes";
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
router.use('/endereco', enderecoRouter);
router.use('/categoria', categoriaRouter);
router.use('/item', itemRouter, itemCategoriaRouter);
router.use('/colaborador', colaboradorRouter, permissaoColaboradorRouter);
router.use('/clientefornecedor', clienteFornecedorRouter);
router.use('/venda', vendaRouter, itemVendaRouter);
router.use('/compra', compraRouter, itemCompraRouter);
router.use('/servico', servicoRouter);
router.use('/prestacao', prestacaoRouter, servicoPrestacaoRouter);

export default router;
