import express from "express";
import pessoaRouter from "../modules/pessoa/routes";

const app = express();

app.use(express.json());
app.use('/pessoa', pessoaRouter);

app.listen(3000, () => console.log("rodando na 3000"));
