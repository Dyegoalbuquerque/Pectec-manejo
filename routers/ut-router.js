import express from 'express';
import { UTController } from '../controllers/ut-controller';
import { Container } from "typedi";

let router = express.Router();

let utController = Container.get(UTController);

router.get('/ciclos-terminacao/ativo', utController.obterCiclosTerminacaoAtivo);

router.post('/ciclo-terminacao', utController.salvarCicloTerminacao);


export default router;