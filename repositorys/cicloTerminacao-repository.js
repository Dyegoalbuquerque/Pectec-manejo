
import { Repository } from './repository';

export class CicloTermicacaoRepository extends Repository{

    constructor() {
        super("cicloTerminacoes");
    }

    obterAtivos = async () => {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.ativo);

        return result;
    }

    obterPorIntervalo = async (dataInicial, dataFinal) => {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => new Date(e.dataEntrada).getTime() >= new Date(dataInicial).getTime() && 
                                       new Date(e.dataEntrada).getTime() <= new Date(dataFinal).getTime());
  
        return result;
    }
}