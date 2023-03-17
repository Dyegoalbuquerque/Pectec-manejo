
import { Dao } from '../config/dao';
import { plainToClass } from "class-transformer";

export class Repository {

    constructor(tipo, classe) {
        this.classe = classe;
        this.tipo = tipo;
        this.dao = new Dao(tipo);
    }

    async obterRepositorio() {
        const conexao = await this.dao.connect();
        return await conexao.collection(this.tipo);
    }

    async obterTodos() {
        const repositorio = await this.obterRepositorio();
        let items = await repositorio.find().toArray();
        
        return plainToClass(this.classe, items);
    }

    async filtrar(query) {
        const repositorio = await this.obterRepositorio();
        let items = await repositorio.find(query).toArray();     

        return plainToClass(this.classe, items);
    }

    async contar(query) {
        const repositorio = await this.obterRepositorio();
        return query ? await repositorio.count(query) :  await repositorio.count();
    }

    async obterPorId(id) {
        const repositorio = await this.obterRepositorio();

        let item = await repositorio.findOne({ _id: ObjectId(id) });
        
        return plainToClass(classe, item);
    }

    async salvar(item) {
        const repositorio = await this.obterRepositorio();
        let novoItem = await repositorio.insertOne(item);

        return novoItem.id;
    }

    async max() {
        const repositorio = await this.obterRepositorio();
        return await repositorio.findOne({$query:{}, $orderby:{_id:-1}})
    }

    async remover(id) {
        const repositorio = await this.obterRepositorio();
        const resultado = await repositorio.deleteOne({ _id: ObjectId(id) });
        return resultado;

    }

    async atualizar(filtro, item) {
        const repositorio = await this.obterRepositorio();
        let resultado = await repositorio.updateOne(filtro, { $set: item });
        return resultado;
    }
}