import { Repository } from './repository';

export class CicloFilhoRepository extends Repository{

    constructor() {
        super('cicloFilho');
    }

    async obterPorCicloId(cicloId) {
        let todos = this.dao.obterTodos();

        let result = todos.filter(e => e.cicloId == cicloId);

        return result;
    }
}