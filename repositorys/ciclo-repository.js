import { Repository } from './repository';

export class CicloRepository extends Repository{

    constructor() {
       super('ciclo');
    }

    async obterApartirDe(ano) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.ano == ano);

        return result;
    }
}