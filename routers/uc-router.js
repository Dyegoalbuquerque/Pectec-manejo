import express from 'express';
import { UCController } from '../controllers/uc-controller';
import { Container } from "typedi";

let router = express.Router();

let ucController = Container.get(UCController);

router.get('/ciclos-crescimento/ativo', ucController.obterCiclosCrescimentoAtivo);

export default router;