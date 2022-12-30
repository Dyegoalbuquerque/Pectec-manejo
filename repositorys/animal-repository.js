
import { Repository } from './repository';
import { Animal } from '../models/animal';

export class AnimalRepository extends Repository{

    constructor() {
        super("animais");
    }

    async obterPorEspecie(especieId) {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.especieId == especieId);

        return result;
    }

    async obterPorNumero(numero) {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.numero == numero);
        result = result[0];

        return result;
    }

    async obterQuantidadePorTag(tag) {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.tag == tag);

        return result.length;
    }

    async obterFemeasAtivas() {
        let result = this.dao.obterTodos();

        let tags = ["G", "L", "CG", "IDC", "M"];

        result = result.filter(a => a.sexo == 'F' && tags.includes(a.tag));

        return result;
    }

    async obterPorSexoTag(sexo, tag) {
        let result = await this.obterTodos();

        result = result.filter(a => a.tag == tag && a.sexo == sexo);

        return result;
    }

    async obterPorSituacao(situacoes) {
        let result = this.dao.obterTodos();

        result = result.filter(r => situacoes.includes(r.tag));

        return result;
    }

    async obterFilhotesPorFemea(femeaId){
        let result = this.dao.obterTodos();

        result = result.filter(r => r.maeId == femeaId);

        return result;
    }
}