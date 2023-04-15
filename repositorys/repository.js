
import { Dao } from '../config/dao';
import { plainToClass } from "class-transformer";
import { ObjectId } from "mongodb";

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

        items.map(i => i.id = i._id.toString());
        
        return plainToClass(this.classe, items);
    }

    async filtrar(query) {
        const repositorio = await this.obterRepositorio();
        let items = await repositorio.find(query).toArray();  

        items.map(i => i.id = i._id.toString());

        return plainToClass(this.classe, items);
    }

    async contar(query) {
        const repositorio = await this.obterRepositorio();
        return query ? await repositorio.count(query) :  await repositorio.count();
    }

    async obterPorId(id) {
        const repositorio = await this.obterRepositorio();
    
        let item = await repositorio.find({_id : ObjectId(id)});
        
        item =  plainToClass(this.classe, item);
        item.id = id;
        return item
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

    async atualizar(id, item) {console.log(id)
        console.log(item)
        const repositorio = await this.obterRepositorio();
        let resultado = await repositorio.updateOne({ _id: ObjectId(id) }, { $set: item });
        return resultado;
    }
}