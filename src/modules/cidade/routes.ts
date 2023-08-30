import express from "express";
import { createCidadeController, getCiadeByIdController, listCidadeController } from "./controller";

const cidadeRouter = express.Router();

cidadeRouter.post('/new', createCidadeController);
cidadeRouter.get('/list', listCidadeController);
cidadeRouter.get('/get/:id', getCiadeByIdController);

export default cidadeRouter;
