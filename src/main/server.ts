import express from "express";
import * as dotenv from "dotenv";
import cidadeRouter from "../modules/cidade/routes";
import pessoaRouter from "../modules/pessoa/routes";
import enderecoRouter from "../modules/endereco/routes";
import pessoaEnderecoRouter from "../modules/pessoa-endereco/routes";
import categoriaRouter from "../modules/categoria/routes";
import itemRouter from "../modules/item/routes";
import itemCategoriaRouter from "../modules/item-categoria/routes";
import colaboradorRouter from "../modules/colaborador/routes";

dotenv.config();
const app = express();

app.use(express.json());

app.use('/pessoa', pessoaRouter, pessoaEnderecoRouter);
app.use('/cidade', cidadeRouter);
app.use('/endereco', enderecoRouter);
app.use('/categoria', categoriaRouter, itemCategoriaRouter);
app.use('/item', itemRouter);
app.use('/colaborador', colaboradorRouter);

const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Rodando na porta ${port}`));
