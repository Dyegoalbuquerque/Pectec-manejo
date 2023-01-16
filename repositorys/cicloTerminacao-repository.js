
import { Repository } from './repository';
import { CicloTerminacao } from '../models/cicloTerminacao';

export class CicloTermicacaoRepository extends Repository{

    constructor() {
        super("cicloTerminacoes", CicloTerminacao);
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