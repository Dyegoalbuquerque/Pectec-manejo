
import { Repository } from './repository';
import { CicloCrescimento } from '../models/cicloCrescimento';

export class CicloCrescimentoRepository extends Repository{

    constructor() {
        super(CicloCrescimento);
    }

    obterAtivos = async () => {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.ativo);

        return result;
    }
}