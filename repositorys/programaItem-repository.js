import { Repository } from './repository';
import { ProgramaItem } from '../models/programaItem';

export class ProgramaItemRepository extends Repository {

    constructor() {
        super(ProgramaItem);
    }

    async obterPorPrograma(programaId) {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.programaId == programaId);

        return result;
    }

    async obterPorSituacao(situacaoId) {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.situacaoId == situacaoId);

        return result;
    }
}