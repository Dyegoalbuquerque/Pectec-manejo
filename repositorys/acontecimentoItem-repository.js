
import { Repository } from './repository';
import { AcontecimentoItem } from '../models/acontecimentoItem';

export class AcontecimentoItemRepository extends Repository {

    constructor() {
        super(AcontecimentoItem);
    }

    obterPorAcontecimento = async (acontecimentoId) => {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.acontecimentoId == acontecimentoId);

        return result;
    }
}