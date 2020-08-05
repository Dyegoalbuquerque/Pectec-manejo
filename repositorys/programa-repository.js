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

    async obterPorTipo(tipoPrograma) {
        let todos = this.dao.obterTodos();

        let programas = todos.filter(f => f.tipo == tipoPrograma);

        return programas.length > 0 ? programas[0] : {};
    }
}