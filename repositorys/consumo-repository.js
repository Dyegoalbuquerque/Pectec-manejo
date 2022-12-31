
import { Repository } from './repository';
import { Consumo } from '../models/consumo';
import { QueryHelper } from './helpers/query-helper';

export class ConsumoRepository extends Repository {

    constructor() {
        super(Consumo);
    }

    async obterPorCategoria(categoriaId){
        let todos = this.dao.obterTodos();

        let filtrados = todos.filter(c => c.categoriaId == categoriaId);

        return filtrados;
    }

    async obterComFiltro(parametroQuery){
        let todos = this.dao.obterTodos();

        return QueryHelper.aplicarQuery(todos, parametroQuery);
    }
}