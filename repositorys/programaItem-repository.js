import { Repository } from './repository';

export class ProgramaItemRepository extends Repository {

    constructor() {
        super("programaItens");
    }

    obterPorPrograma = async (programaId) => {
        let query = {programaId: programaId} 

        return await this.filtrar(query);
    }

    obterPorTag = async (tagId) => {
        let query = {tagId: tagId} 

        return await this.filtrar(query);
    }

    obterPorTagIds = async (tagIds) => {        
        let query = { tagId: { $in: tagIds } };

        return await this.filtrar(query);
    }

    obterAtivosPorProgramaIds = async (programaIds) => {  
        let query = { programaId: { $in: programaIds }, ativo: true };

        return await this.filtrar(query);
    }
}