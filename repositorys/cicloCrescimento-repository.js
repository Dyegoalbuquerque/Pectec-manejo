
import { Repository } from './repository';
import { CicloCrescimento } from '../models/cicloCrescimento';

export class CicloCrescimentoRepository extends Repository{

    constructor() {
        super("cicloCrescimentos", CicloCrescimento);
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