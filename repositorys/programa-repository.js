import { Repository } from './repository';
import { Programa } from '../models/programa';

export class ProgramaRepository extends Repository {

    constructor() {
        super(Programa);
    }

    async obterTodos() {
        let todos = this.dao.obterTodos();

        return todos;
    }

    async obterPorTipo(tipoProgramaId) {
        let todos = this.dao.obterTodos();

        let programas = todos.filter(f => f.tipoProgramaId == tipoProgramaId);

        return programas.length > 0 ? programas[0] : {};
    }
}