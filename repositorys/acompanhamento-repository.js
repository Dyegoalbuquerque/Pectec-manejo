
import { Repository } from './repository';
import { AcompanhamentoMaterno } from '../models/acompanhamentoMaterno';

export class AcompanhamentoRepository extends Repository{

    constructor() {
        super(AcompanhamentoMaterno);
    }

    async obterPorFemea(femeaId) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.femeaId == femeaId);

        return result;
    }
}