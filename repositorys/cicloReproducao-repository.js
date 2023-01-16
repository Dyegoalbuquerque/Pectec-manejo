
import { Repository } from './repository';

export class CicloReproducaoRepository extends Repository{

    constructor() {
        super("cicloReproducoes");
    }

    async obterPorFemea(femeaId) {
        let query = {femeaId: femeaId} 

        return await this.filtrar(query);
    }

    async obterAtivoPorFemea(femeaId) {
        let query = {femeaId: femeaId, ativo: true} 

        return await this.filtrar(query);
    }

    async obterPorIntervalo(dataInicial, dataFinal) {        
        let query = {dataFecundacao:{ $gte: dataInicial, $lt: dataFinal}} 

        return await this.filtrar(query);
    }
}