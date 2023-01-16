
import { Repository } from './repository';

export class AcontecimentoItemRepository extends Repository {

    constructor() {
        super("acontetimentoItens");
    }

    obterPorAcontecimento = async (acontecimentoId) => {
        let query = {acontecimentoId: acontecimentoId};

        return await this.filtrar(query);
    }
}