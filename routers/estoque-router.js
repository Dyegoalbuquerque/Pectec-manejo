import express from 'express';
import { EstoqueController } from '../controllers/estoque-controller';
import { Container } from "typedi";

let router = express.Router();

let estoqueController = Container.get(EstoqueController);


router.get('/', estoqueController.obterEstoquePorCategoria);

router.get('/real', estoqueController.obterEstoqueRealPorCategoria);

router.post('/', estoqueController.salvarEstoque);

router.post('/racao', estoqueController.salvarRacao);

router.get('/origens', estoqueController.obterOrigens);

router.get('/origens/:id', estoqueController.obterOrigem);

router.get('/consumo', estoqueController.obterConsumos);

router.post('/consumo', estoqueController.salvarConsumo);

router.put('/consumo', estoqueController.atualizarConsumo);

export default router;