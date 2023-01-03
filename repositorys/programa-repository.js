import { Repository } from './repository';

export class ProgramaRepository extends Repository {

    constructor() {
        super("programas");
    }

    obterTodos = async () => {
        let todos = this.dao.obterTodos();

        return todos;
    }

    obterPorTipo = async (tipoPrograma) => {
        let todos = this.dao.obterTodos();

        let programas = todos.filter(f => f.tipo == tipoPrograma);

        return programas.length > 0 ? programas[0] : {};
    }

    obterPorSetor = async (setor) => {
        let todos = this.dao.obterTodos();

        let programas = todos.filter(f => f.setor == setor);
        
        return programas;
    }
}