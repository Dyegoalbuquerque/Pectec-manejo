
import { Dao } from '../config/dao';

export class Repository {

    constructor(tipo) {
        this.dao = new Dao(tipo);
    }

    dao;

    async obterTodos() {
        let result = this.dao.obterTodos();

        return result;
    }

    async obterPorId(id) {
        let item = this.dao.buscarPorId(id);

        return item;
    }

    async salvar(item) {
        let id = this.dao.adicionar(item);
        item.id = id;

        return item.id;
    }

    async max() {
        return this.dao.max();
    }

    async remover(id) {
        this.dao.removerPorId(id);
    }

    async atualizar(item) {
        return this.dao.atualizar(item);
    }
}