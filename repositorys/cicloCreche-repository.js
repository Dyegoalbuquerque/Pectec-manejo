
import { Repository } from './repository';
import { CicloCreche } from '../models/cicloCreche';

export class CicloCrecheRepository extends Repository{

    constructor() {
        super("cicloCreches", CicloCreche);
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