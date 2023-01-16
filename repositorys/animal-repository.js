
import { Repository } from './repository';

export class AnimalRepository extends Repository{

    constructor() {
        super("animais");
    }

    async obterPorEspecie(especieId) {
        let query = {especieId: especieId};

        return await this.filtrar(query);
    }

    async obterPorNumero(numero) {
        let query = {numero: numero};

        return await this.filtrar(query);
    }

    async obterQuantidadePorTag(tag) {
        let query = {tag: tag};

        return await this.contar(query);
    }

    async obterFemeasAtivas() {
        let tags = ["G", "L", "CG", "IDC", "M"];

        let query = { sexo: "F", tag: { $in: tags } };

        return await this.filtrar(query);
    }

    async obterPorSexoTag(sexo, tag) {
        let query = {tag: tag, sexo: sexo};

        return await this.filtrar(query);
    }

    async obterPorSituacao(situacoes) {
        let query = { tag: { $in: situacoes } };

        return await this.filtrar(query);
    }

    async obterFilhotesPorFemea(femeaId){        
        let query = {maeId: femeaId};

        return await this.filtrar(query);
    }
}