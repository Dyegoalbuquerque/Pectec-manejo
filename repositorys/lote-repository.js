
import { Repository } from './repository';
import { Lote } from '../models/lote';

export class LoteRepository extends Repository{

    constructor() {
        super(Lote);
    }

    async obterPorTipo(tipo) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(a => a.tipo == tipo);

        return result;
    }

    async obterLotesDisponiveis(tipo) {
        let todos = await this.obterPorTipo(tipo);

        let result = todos.filter(l => l.identificacoes.length > 0);

        return result;
    }
}