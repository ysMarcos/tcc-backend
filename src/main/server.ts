import express from "express";
import cidadeRouter from "../modules/cidade/routes";
import pessoaRouter from "../modules/pessoa/routes";
import enderecoRouter from "../modules/endereco/routes";

const app = express();

app.use(express.json());

app.use('/pessoa', pessoaRouter);
app.use('/cidade', cidadeRouter);
app.use('/endereco', enderecoRouter);
app.listen(3000, () => console.log("rodando na 3000"));
