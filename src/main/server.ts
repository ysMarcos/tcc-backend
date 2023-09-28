import express from "express";
import api from "./express";

import { expressPort } from "../../env";

const app = express();

app.use(express.json());

app.use('/api', api);

const port = expressPort;

app.listen(port, () => console.log(`Rodando na porta ${port}`));
