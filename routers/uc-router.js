import express from 'express';
import { UCController } from '../controllers/uc-controller';
import { Container } from "typedi";

let router = express.Router();

let ucController = Container.get(UCController);

router.get('/ciclos-creche/ativo', ucController.obterCiclosCrecheAtivo);

router.get('/relatorios/uc', ucController.obterRelatorioUC);

router.post('/ciclo-creche', ucController.salvarCicloCreche);


export default router;