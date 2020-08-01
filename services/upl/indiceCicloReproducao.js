export class IndiceCicloReproducao {

    static obterQuantidadeCiclosNascidos(ciclos) {
        let quantidadeCiclosNascidos = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.dataPartoReal ? 1 : 0);
        }, 0);

        quantidadeCiclosNascidos = !quantidadeCiclosNascidos ? 1 : quantidadeCiclosNascidos;

        return quantidadeCiclosNascidos;
    }

    static obterQuantidadeCiclosDesmamados(ciclos) {
        let quantidadeCiclosDesmamados = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.dataDesmameReal ? 1 : 0);
        }, 0);

        return quantidadeCiclosDesmamados;
    }

    static obterQuantidadeLeitoesNascidos(ciclos) {
        let quantidadeAnimaisNascidos = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.dataPartoReal ? ciclo.quantidadeFilhoteVV : 0);
        }, 0);

        return quantidadeAnimaisNascidos;
    }

    static obterQuantidadeLeitoesMortos(ciclos) {
        let quantidadeAnimaisMortos = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.dataPartoReal ? ciclo.quantidadeFilhoteMorto : 0);
        }, 0);

        return quantidadeAnimaisMortos;
    }

    static obterQuantidadeLeitoesVivos(ciclos) {
        let quantidadeTotalLeitaoVivo = ciclos.reduce((sum, ciclo) => {
            return sum + ciclo.calcularQuantidadeFilhotesAtual();
        }, 0);

        return quantidadeTotalLeitaoVivo;
    }

    static obterNLN(ciclos, quantidadeCiclosNascidos) {
        let nlnMedioGeral = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.quantidadeFilhoteVV ? ciclo.quantidadeFilhoteVV : 0);
        }, 0) / quantidadeCiclosNascidos;

        nlnMedioGeral = parseFloat(nlnMedioGeral).toFixed(2);

        return nlnMedioGeral;
    }

    static obterNLD(ciclos, quantidadeCiclosDesmamados) {
        let nldMedioGeral = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.quantidadeDesmamado ? ciclo.quantidadeDesmamado : 0);
        }, 0) / quantidadeCiclosDesmamados;

        nldMedioGeral = parseFloat(nldMedioGeral).toFixed(2);

        return nldMedioGeral;
    }

    static obterPMLN(ciclos, quantidadeCiclosNascidos) {

        let pmlnMedioGeral = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.pesoFilhoteNascimento ? ciclo.pesoFilhoteNascimento : 0);
        }, 0) / quantidadeCiclosNascidos;

        pmlnMedioGeral = parseFloat(pmlnMedioGeral).toFixed(2);

        return pmlnMedioGeral;
    }

    static obterPMLD(ciclos, quantidadeCiclosDesmamados) {
        let pmldMedioGeral = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.pesoFilhoteDesmamado ? ciclo.pesoFilhoteDesmamado : 0);
        }, 0) / quantidadeCiclosDesmamados;

        pmldMedioGeral = parseFloat(pmldMedioGeral).toFixed(2);

        return pmldMedioGeral;
    }

    static obterTaxaMortalidade(ciclos) {

        let quantidadeAnimaisNascidos = this.obterQuantidadeLeitoesNascidos(ciclos);
        let quantidadeAnimaisMortos = this.obterQuantidadeLeitoesMortos(ciclos);

        let taxaMortalidade = (quantidadeAnimaisMortos * 100) / quantidadeAnimaisNascidos;

        return parseFloat(taxaMortalidade).toFixed(2);
    }
}