import express from 'express';
import { UplController } from '../controllers/upl-controller';
import { Container } from "typedi";

let router = express.Router();

let uplController = Container.get(UplController);

router.get('/animal/:id', uplController.obterAnimalPorId);

router.get('/animal/:id/ficha', uplController.obterFichaAnimal);

router.get('/ciclos-reproducao', uplController.obterCiclosReproducaoPorAno);

router.put('/animal', uplController.atualizarAnimal);

router.delete('/animal/:id',uplController.removerAnimal);

router.post('/animal', uplController.salvarAnimal);

router.get('/animal/:id/ciclos-reproducao/ativo', uplController.obterCiclosReproducaoAtivoPorAnimal);

router.post('/animal/ciclo-reproducao', uplController.salvarCicloReproducao);

router.put('/animal/ciclo-reproducao', uplController.atualizarCicloReproducao);

router.get('/reprodutores', uplController.obterReprodutores);

router.get('/programa', uplController.obterPrograma);

router.get('/programa-itens', uplController.obterProgramaItensPorTag);

router.delete('/programa-item/:id', uplController.removerProgramaItem);

router.put('/programa-item', uplController.atualizarProgramaItem);

router.post('/programa-item', uplController.salvarProgramaItem);

router.get('/tags-quantidades', uplController.obterTagsQuantidades);

router.get('/tags', uplController.obterTags);

router.get('/causa-obitos', uplController.obterCausaObitos);

router.get('/relatorios/upl', uplController.obterRelatorioUpl);

router.get('/relatorios/matriz', uplController.obterRelatorioMatrizes);

router.get('/acontecimentos', uplController.obterAcontecimentosPorSetor);

export default router;