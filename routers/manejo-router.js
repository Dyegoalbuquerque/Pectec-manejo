import express from 'express';
import { ManejoController } from '../controllers/manejo-controller';
import { Container } from "typedi";

let router = express.Router();

let manejoController = Container.get(ManejoController);

router.get('/animal/:id', manejoController.obterAnimalPorId);

router.get('/animal/:id/ficha', manejoController.obterFichaAnimal);

router.get('/acompanhamentos', manejoController.obterAcompanhamentosPorAno);

router.put('/animal', manejoController.atualizarAnimal);

router.delete('/animal/:id',manejoController.removerAnimal);

router.post('/animal', manejoController.salvarAnimal);

router.get('/animal/:id/acompanhamentos', manejoController.obterAcompanhamentosPorAnimal);

router.post('/animal/acompanhamento', manejoController.salvarAcompanhamento);

router.put('/animal/acompanhamento', manejoController.atualizarAcompanhamento);

router.get('/lote', manejoController.obterLotesVenda);

router.get('/reprodutores', manejoController.obterReprodutores);

router.get('/programa', manejoController.obterPrograma);

router.get('/programa-itens', manejoController.obterProgramaItensPorSituacao);

router.get('/filhotes', manejoController.obterFilhotes);

router.get('/ciclo/:ano', manejoController.obterCiclosApartirDe);

router.post('/ciclo/filhos', manejoController.obterCiclosFilhosPorIds);

router.post('/ciclo', manejoController.salvarCiclo);

router.put('/ciclo', manejoController.atualizarCiclo);

router.post('/simular-ciclo', manejoController.simularCiclo);

router.delete('/ciclo/:id', manejoController.removerCiclo);

router.get('/programa', manejoController.obterPrograma);

router.delete('/programa-item/:id', manejoController.removerProgramaItem);

router.put('/programa-item', manejoController.atualizarProgramaItem);

router.post('/programa-item', manejoController.salvarProgramaItem);

router.get('/situacoes-quantidades', manejoController.obterSituacoesQuantidades);

router.get('/situacoes', manejoController.obterSituacoes);

router.put('/situacoes', manejoController.atualizarSituacoes);

router.get('/causa-obitos', manejoController.obterCausaObitos);

export default router;