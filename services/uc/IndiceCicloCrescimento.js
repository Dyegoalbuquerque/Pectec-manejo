export class IndiceCicloCrescimento {

    static obterQuantidadeAnimaisQueEntraram(ciclos) {
        let quantidadeAnimaisQueEntraram = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.quantidadeEntrada ? ciclo.quantidadeEntrada : 0);
        }, 0);

        return quantidadeAnimaisQueEntraram;
    }

    static obterQuantidadeAnimaisMortos(ciclos) {
        let quantidadeAnimaisMortos = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.quantidadeAnimalMorto ? ciclo.quantidadeAnimalMorto : 0);
        }, 0);

        return quantidadeAnimaisMortos;
    }

    static obterQuantidadeAnimaisNaUC(ciclos) {
        let quantidadeAnimaisNaUC = ciclos.reduce((sum, ciclo) => {
            return sum + ciclo.calcularQuantidadeAnimalAtual();
        }, 0);
        return quantidadeAnimaisNaUC;
    }

    static obterTaxaMortalidade(ciclos) {

        let quantidadeAnimaisQueEntraram = this.obterQuantidadeAnimaisQueEntraram(ciclos);
        let quantidadeAnimaisMortos = this.obterQuantidadeAnimaisMortos(ciclos);

        let taxaMortalidade = (quantidadeAnimaisMortos * 100) / quantidadeAnimaisQueEntraram;

        return parseFloat(taxaMortalidade).toFixed(2);
    }
}