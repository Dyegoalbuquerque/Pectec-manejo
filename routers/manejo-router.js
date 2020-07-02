import express from 'express';
import { ManejoController } from '../controllers/manejo-controller';
import { Container } from "typedi";

let router = express.Router();

let manejoController = Container.get(ManejoController);

router.get('/animal/:id', manejoController.obterAnimalPorId);

router.get('/animal/:id/ficha', manejoController.obterFichaAnimal);

router.get('/ciclos-reproducao', manejoController.obterCiclosReproducaoPorAno);

router.put('/animal', manejoController.atualizarAnimal);

router.delete('/animal/:id',manejoController.removerAnimal);

router.post('/animal', manejoController.salvarAnimal);

router.get('/animal/:id/ciclos-reproducao', manejoController.obterCiclosReproducaoPorAnimal);

router.post('/animal/ciclo-reproducao', manejoController.salvarCicloReproducao);

router.put('/animal/ciclo-reproducao', manejoController.atualizarCicloReproducao);

router.get('/lote', manejoController.obterLotesVenda);

router.get('/reprodutores', manejoController.obterReprodutores);

router.get('/programa', manejoController.obterPrograma);

router.get('/programa-itens', manejoController.obterProgramaItensPorSituacao);

router.get('/filhotes', manejoController.obterFilhotes);

router.get('/programa', manejoController.obterPrograma);

router.delete('/programa-item/:id', manejoController.removerProgramaItem);

router.put('/programa-item', manejoController.atualizarProgramaItem);

router.post('/programa-item', manejoController.salvarProgramaItem);

router.get('/situacoes-quantidades', manejoController.obterSituacoesQuantidades);

router.get('/situacoes', manejoController.obterSituacoes);

router.put('/situacoes', manejoController.atualizarSituacoes);

router.get('/causa-obitos', manejoController.obterCausaObitos);

export default router;