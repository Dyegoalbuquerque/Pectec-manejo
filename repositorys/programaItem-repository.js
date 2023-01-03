import { Repository } from './repository';

export class ProgramaItemRepository extends Repository {

    constructor() {
        super("programaItens");
    }

    obterPorPrograma = async (programaId) => {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.programaId == programaId);

        return result;
    }

    obterPorTag = async (tagId) => {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.tagId == tagId);

        return result;
    }

    obterPorTagIds = async (tagIds) => {
        let result = this.dao.obterTodos();

        result = result.filter(r => tagIds.includes(r.tagId));

        return result;
    }

    obterAtivosPorProgramaIds = async (programaIds) => {
        let result = this.dao.obterTodos();

        result = result.filter(r => programaIds.includes(r.programaId) && r.ativo);

        return result;

    }
}