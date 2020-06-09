
import { Repository } from './repository';
import { Subcategoria } from '../models/subCategoria';

export class SubcategoriaRepository extends Repository {

    constructor() {
        super(Subcategoria);
    }

    async obterPorCodigoCategoria(codigo) {
        let result = this.dao.obterTodos();
  
        result = result.filter(r => r.codigoCategoria == codigo);
  
        return result;
     }

     async obterPorCategoria(categoriaId) {
        let result = this.dao.obterTodos();

        if(typeof categoriaId === 'string'){
            return result;
        }
  
        result = result.filter(r => r.categoriaId == categoriaId);
  
        return result;
     }
}