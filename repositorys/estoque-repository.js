
import { Repository } from './repository';

export class EstoqueRepository extends Repository {

   constructor() {
      super("estoques");
   }

   async obterPorIds(ids) {
      let result = await this.obterTodos();

      result = result.filter(r => ids.includes(r.id));

      return result;
   }

   async obterPorSubcategorias(subcategoriaIds) {
      let result = this.dao.obterTodos();

      result = result.filter(r => subcategoriaIds.includes(r.subcategoriaId));

      return result;
   }

   async obterEstoqueRealPorSubcategoria(subcategoriaId) {
      let result = this.dao.obterTodos();

      result = result.filter(r => r.subcategoriaId == subcategoriaId && r.quantidadeEntradaReal > 0);

      return result;
   }

   async obterEstoqueReal(subcategoriaIds) {
      let result = this.dao.obterTodos();

      result = result.filter(r => subcategoriaIds.includes(r.subcategoriaId) && r.quantidadeEntradaReal > 0);

      return result;
   }
}