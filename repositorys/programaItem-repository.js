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

    async obterPorTag(tagId) {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.tagId == tagId);

        return result;
    }

    async obterPorTagIds(tagIds){
        let result = this.dao.obterTodos();

        result = result.filter(r => tagIds.includes(r.tagId));

        return result;
    }
}