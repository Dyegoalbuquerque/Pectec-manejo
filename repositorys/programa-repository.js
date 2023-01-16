import { Repository } from './repository';

export class ProgramaRepository extends Repository {

    constructor() {
        super("programas");
    }

    obterTodos = async () => {
        let todos = await this.obterTodos();

        return todos;
    }

    obterPorTipo = async (tipoPrograma) => {
        let query = {tipo: tipoPrograma} 

        let programas = await this.filtrar(query);

        return programas.length > 0 ? programas[0] : {};
    }

    obterPorSetor = async (setor) => {        
        let query = {setor: setor} 

        return await this.filtrar(query);
    }
}