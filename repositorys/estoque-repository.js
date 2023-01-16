
import { Repository } from './repository';
import { Estoque } from '../models/estoque';

export class EstoqueRepository extends Repository {

   constructor() {
      super("estoques", Estoque);
   }

   async obterPorIds(ids) {
      let query = { id: { $in: ids } };

      return await this.filtrar(query);
   }

   async obterPorSubcategorias(subcategoriaIds) {
      let query = { subcategoriaId: { $in: subcategoriaIds } };

      return await this.filtrar(query);
   }

   async obterEstoqueRealPorSubcategoria(subcategoriaId) {
      let query = { subcategoriaId: subcategoriaId, quantidadeEntradaReal: { $gt: 0 } };

      return await this.filtrar(query);
   }

   async obterEstoqueReal(subcategoriaIds) {
      let query = { subcategoriaId: { $in: subcategoriaIds }, quantidadeEntradaReal: { $gt: 0 } };

      return await this.filtrar(query);
   }
}