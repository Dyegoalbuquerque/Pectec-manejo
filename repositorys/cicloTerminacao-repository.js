
import { Repository } from './repository';

export class CicloTermicacaoRepository extends Repository{

    constructor() {
        super("cicloTerminacoes");
    }

    obterAtivos = async () => {
        let query = {ativo: true} 

        return await this.filtrar(query);
    }

    obterPorIntervalo = async (dataInicial, dataFinal) => {        
        let query = {dataEntrada:{ $gte: dataInicial, $lt: dataFinal}} 

        return await this.filtrar(query);
    }
}