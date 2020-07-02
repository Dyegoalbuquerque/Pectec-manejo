
import { Repository } from './repository';
import { CicloReproducao } from '../models/cicloReproducao';

export class CicloReproducaoRepository extends Repository{

    constructor() {
        super(CicloReproducao);
    }

    async obterPorFemea(femeaId) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.femeaId == femeaId);

        return result;
    }
}