import { EstoqueService } from '../services/estoque-service';
import {BaseController } from './base-controller';

export class EstoqueController extends BaseController {

   constructor(container) {
      super();
      this.estoqueService = container.get(EstoqueService);
   }

   obterEstoqueRealPorCategoria = async (req, res) => {

      try {
         let codigo = req.query.codigoCategoria;
         let data = await this.estoqueService.obterEstoqueRealPorCategoria(codigo);
         return res.send(200, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterEstoquePorCategoria = async (req, res) => {

      try {
         let categoriaId = req.query.categoriaId;
         let data = await this.estoqueService.obterEstoquePorCategoria(categoriaId);
         return res.send(200, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterOrigens = async (req, res) => {

      try {
         let categoriaId = req.query.categoriaId;
         let data = await this.estoqueService.obterOrigens(categoriaId);
         return res.send(200, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterOrigem = async (req, res) => {

      try {
         let id = req.params.id;
         let data = await this.estoqueService.obterOrigem(id);
         return res.send(200, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   salvarRacao = async (req, res) => {

      try {
         var data = await this.estoqueService.salvarRacao(req.body);
         return res.send(201, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   salvarEstoque = async (req, res) => {

      try {
         var data = await this.estoqueService.salvarEstoque(req.body);
         return res.send(201, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterConsumos = async (req, res) => {

      try {
         let pagina = req.query.pagina;
         let limite = req.query.limite;
         let ordenar = req.query.ordenar;
         let parametroQuery = { pagina: parseInt(pagina), limite: parseInt(limite), ordenar: ordenar};
         let data = await this.estoqueService.obterConsumos(parametroQuery);
         return res.send(200, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   salvarConsumo = async (req, res) => {

      try {
         var data = await this.estoqueService.salvarConsumo(req.body);
         return res.send(201, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   atualizarConsumo = async (req, res) => {

      try {
         var data = await this.estoqueService.atualizarConsumo(req.body);
         return res.send(200, data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }
}
