
import { Repository } from './repository';
import { QueryHelper } from './helpers/query-helper';

export class ConsumoRepository extends Repository {

    constructor() {
        super("consumos");
    }

    async obterPorCategoria(categoriaId){
        let query = {categoriaId: categoriaId} 

        return await this.filtrar(query);
    }

    async obterComFiltro(parametroQuery){
        let todos = await this.obterTodos();

        return QueryHelper.aplicarQuery(todos, parametroQuery);
    }
}