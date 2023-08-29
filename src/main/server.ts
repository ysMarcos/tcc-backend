import express from "express";
import router from "../modules/pessoa/routes";

const app = express();

app.use(express.json());
app.use('/pessoa', router);

app.listen(3000, () => console.log("rodando na 3000"));
