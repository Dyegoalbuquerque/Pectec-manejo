
import { Repository } from './repository';
import { AcontecimentoItem } from '../models/acontecimentoItem';

export class AcontecimentoItemRepository extends Repository {

    constructor() {
        super("acontetimentoItens", AcontecimentoItem);
    }

    obterPorAcontecimento = async (acontecimentoId) => {
        let query = {acontecimentoId: acontecimentoId};

        return await this.filtrar(query);
    }
}