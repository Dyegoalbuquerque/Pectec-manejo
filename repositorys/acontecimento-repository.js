
import { Repository } from './repository';

export class AcontecimentoRepository extends Repository {

    constructor() {
        super("acontecimentos");
    }

    verificarSeExiste = async (setor, dataInicial, dataFinal) => {
        let result = await this.obterPorIntervalo(setor, dataInicial, dataFinal);

        return result.length > 0;
    }

    obterPorIntervalo = async (setor, dataInicial, dataFinal) => {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => new Date(e.data).getTime() >= new Date(dataInicial).getTime() &&
                                       new Date(e.data).getTime() <= new Date(dataFinal).getTime() &&
                                       e.setor == setor);
        return result;
    }
}