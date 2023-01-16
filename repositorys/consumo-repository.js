
import { Repository } from './repository';
import { Consumo } from '../models/consumo';
import { QueryHelper } from './helpers/query-helper';

export class ConsumoRepository extends Repository {

    constructor() {
        super("consumos", Consumo);
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