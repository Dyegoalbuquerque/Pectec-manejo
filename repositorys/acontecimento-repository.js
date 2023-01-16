
import { Repository } from './repository';
import { Acontecimento } from '../models/acontecimento';

export class AcontecimentoRepository extends Repository {

    constructor() {
        super("acontecimentos", Acontecimento);
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