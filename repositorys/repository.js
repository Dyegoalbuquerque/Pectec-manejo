
import { Dao } from '../config/dao';

export class Repository {

    constructor(tipo) {
        this.tipo = tipo;
        this.dao = new Dao(tipo);
    }

    async obterRepositorio() {
        const conexao = await this.dao.connect();
        return await conexao.collection(this.tipo);
    }

    async obterTodos() {
        const repositorio = await this.obterRepositorio();
        return repositorio.find().toArray();
    }

    async filtrar(query) {
        const repositorio = await this.obterRepositorio();
        return repositorio.find(query).toArray();
    }

    async contar(query) {
        const repositorio = await this.obterRepositorio();
        return query ? repositorio.count(query) : repositorio.count();
    }

    async obterPorId(id) {
        const repositorio = await this.obterRepositorio();

        return repositorio.findOne({ _id: ObjectId(id) });
    }

    async salvar(item) {
        const repositorio = await this.obterRepositorio();
        let novoItem = repositorio.insertOne(item);

        return novoItem.id;
    }

    async max() {
        const repositorio = await this.obterRepositorio();
        return repositorio.findOne({$query:{}, $orderby:{_id:-1}})
    }

    async remover(id) {
        const repositorio = await this.obterRepositorio();
        const resultado = await repositorio.deleteOne({ _id: ObjectId(id) });
        return resultado;

    }

    async atualizar(filtro, item) {
        const repositorio = await this.obterRepositorio();
        let resultado = repositorio.updateOne(filtro, { $set: item });
        return resultado;
    }
}