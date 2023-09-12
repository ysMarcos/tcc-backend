import express from "express";
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

import { expressPort } from "../../env";

const app = express();

app.use(express.json());

app.use('/pessoa', pessoaRouter, pessoaEnderecoRouter);
app.use('/cidade', cidadeRouter);
app.use('/endereco', enderecoRouter);
app.use('/categoria', categoriaRouter, itemCategoriaRouter);
app.use('/item', itemRouter);
app.use('/colaborador', colaboradorRouter, permissaoColaboradorRouter);
app.use('/permissao', permissaoRouter);

const port = expressPort;

app.listen(port, () => console.log(`Rodando na porta ${port}`));
