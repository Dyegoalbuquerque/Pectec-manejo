import { Repository } from './repository';
import { Tag } from '../models/tag';

export class TagRepository extends Repository {

    constructor() {
        super("tags", Tag);
    }

    async obterPorSetor(setor) {        
        let query = { setores: { $in: [setor] } };

        return await this.filtrar(query);
     }

     async obterPorTipo(tipo) {
        let query = { tipo: tipo};

        return await this.filtrar(query);
     }
}