
import { Repository } from './repository';
import { Acontecimento } from '../models/acontecimento';
import { DataHelper } from '../helpers/dataHelper';

export class AcontecimentoRepository extends Repository {

    constructor() {
        super(Acontecimento);
    }

    verificarSeExiste = async (setor, data) => {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.setor == setor && DataHelper.saoIguais(a.data, data));
        result = result[0];

        return result;
    }

    obterPorData = async (data) => {
        let result = this.dao.obterTodos();

        result = result.filter(a => DataHelper.saoIguais(a.data, data));

        return result;
    }
}