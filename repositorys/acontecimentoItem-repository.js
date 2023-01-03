
import { Repository } from './repository';

export class AcontecimentoItemRepository extends Repository {

    constructor() {
        super("acontetimentoItens");
    }

    obterPorAcontecimento = async (acontecimentoId) => {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.acontecimentoId == acontecimentoId);

        return result;
    }
}