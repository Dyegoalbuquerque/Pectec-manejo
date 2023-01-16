
import { Repository } from './repository';

export class AcontecimentoRepository extends Repository {

    constructor() {
        super("acontecimentos");
    }

    verificarSeExiste = async (setor, dataInicial, dataFinal) => {
        let query = {setor: setor, dataNascimento:{ $gte: dataInicial, $lt: dataFinal}} 
        let result = await this.contar(query);

        return result > 0;
    }

    obterPorIntervalo = async (setor, dataInicial, dataFinal) => {
        let query = {setor: setor, dataNascimento:{ $gte: dataInicial, $lt: dataFinal}} 

        return await this.filtrar(query);
    }
}