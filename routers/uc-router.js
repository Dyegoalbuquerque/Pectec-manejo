import express from 'express';
import { UCController } from '../controllers/uc-controller';
import { Container } from "typedi";

let router = express.Router();

let ucController = Container.get(UCController);

router.get('/ciclos-crescimento/ativo', ucController.obterCiclosCrescimentoAtivo);

router.get('/relatorios/uc', ucController.obterRelatorioUC);


export default router;