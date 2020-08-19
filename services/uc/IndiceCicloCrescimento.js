export class IndiceCicloCrescimento {

    static obterQuantidadeLeitoesNaUC(ciclos) {
        let quantidadeLeitoesNaUC = ciclos.reduce((sum, ciclo) => {
            return sum + ciclo.calcularQuantidadeAnimalAtual();
        }, 0);
        return quantidadeLeitoesNaUC;
    }
}