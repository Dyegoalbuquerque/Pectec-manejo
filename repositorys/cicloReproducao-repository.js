
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

    async obterAtivoPorFemea(femeaId) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.femeaId == femeaId && e.ativo);

        return result;
    }

    async obterPorIntervalo(dataInicial, dataFinal) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => new Date(e.dataFecundacao).getTime() >= new Date(dataInicial).getTime() && 
                                       new Date(e.dataFecundacao).getTime() <= new Date(dataFinal).getTime());
        return result;
    }
}