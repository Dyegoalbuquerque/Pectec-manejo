
import { Repository } from './repository';
import { Animal } from '../models/animal';

export class AnimalRepository extends Repository{

    constructor() {
        super(Animal);
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

    async obterQuantidadePorSituacao(situacao) {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.situacao == situacao);

        return result.length;
    }

    async obterFemeasAtivas() {
        let result = this.dao.obterTodos();

        let situacoes = ["G", "L", "CG", "IDC", "M"];

        result = result.filter(a => a.sexo == 'F' && situacoes.includes(a.situacao));

        return result;
    }

    async obterPorSexoSituacao(sexo, situacao) {
        let result = this.dao.obterTodos();

        result = result.filter(a => a.situacao == situacao && a.sexo == sexo);

        return result;
    }

    async obterPorSituacao(situacoes) {
        let result = this.dao.obterTodos();

        result = result.filter(r => situacoes.includes(r.situacao));

        return result;
    }

    async obterFilhotesPorFemea(femeaId){
        let result = this.dao.obterTodos();

        result = result.filter(r => r.maeId == femeaId);

        return result;
    }
}