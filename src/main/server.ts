import express from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";

import api from "./express";
import { expressPort } from "../../env";
import swaggerDocs from "./swagger.json";

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin:'*'
}));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use('/api', api);

const port = expressPort;

app.listen(port, () => console.log(`Rodando na porta ${port}`));
