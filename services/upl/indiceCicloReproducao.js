export class IndiceCicloReproducao {

    static calcularDivisao(numerador, denominador){
        denominador = denominador ? denominador : 1;

        return parseFloat(numerador/denominador).toFixed(2);
    }

    static obterCiclosPorMatriz(ciclos, femeaId) {
        return ciclos.filter(c => c.femeaId == femeaId);
    }

    static obterQuantidadeCiclosPorMatriz(ciclos, femeaId) {
        let quantidadeCiclos = ciclos.filter(c => c.femeaId == femeaId);

        return quantidadeCiclos.length;
    }

    static obterQuantidadePartos(ciclos) {
        let quantidadeCiclosNascidos = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.dataPartoReal ? 1 : 0);
        }, 0);

        return quantidadeCiclosNascidos;
    }

    static obterQuantidadeDesmamados(ciclos) {
        let quantidadeCiclosDesmamados = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.dataDesmameReal ? 1 : 0);
        }, 0);

        return quantidadeCiclosDesmamados;
    }

    static obterQuantidadeCiclosNascidos(ciclos) {
        let quantidadeCiclosNascidos = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.quantidadeFilhoteVV ? 1 : 0);
        }, 0);

        return quantidadeCiclosNascidos;
    }

    static obterQuantidadeCiclosDesmamados(ciclos) {
        let quantidadeCiclosDesmamados = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.quantidadeDesmamado ? 1 : 0);
        }, 0);

        return quantidadeCiclosDesmamados;
    }

    static obterQuantidadeNascidos(ciclos) {
        let quantidadeAnimaisNascidos = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.dataPartoReal ? ciclo.quantidadeFilhoteVV : 0);
        }, 0);

        return quantidadeAnimaisNascidos;
    }

    static obterQuantidadeMortos(ciclos) {
        let quantidadeAnimaisMortos = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.dataPartoReal ? ciclo.quantidadeFilhoteMorto : 0);
        }, 0);

        return quantidadeAnimaisMortos;
    }

    static obterQuantidadeVivos(ciclos) {
        let quantidadeTotalLeitaoVivo = ciclos.reduce((sum, ciclo) => {
            return sum + ciclo.calcularQuantidadeFilhotesAtual();
        }, 0);

        return quantidadeTotalLeitaoVivo;
    }

    static obterQuantidadeInativos(ciclos) {
        let quantidadeInativos = ciclos.reduce((sum, ciclo) => {
            return sum + (!ciclo.ativo ? 1: 0);
        }, 0);

        return quantidadeInativos;
    }

    static obterNLN(ciclos, quantidadeCiclosNascidos) {

        let nlnMedioGeral = this.obterQuantidadeNascidos(ciclos);

        return this.calcularDivisao(nlnMedioGeral, quantidadeCiclosNascidos);
    }

    static obterNLD(ciclos, quantidadeCiclosDesmamados) {
        let nldMedioGeral = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.quantidadeDesmamado ? ciclo.quantidadeDesmamado : 0);
        }, 0);

        return this.calcularDivisao(nldMedioGeral, quantidadeCiclosDesmamados);
    }

    static obterPLN(ciclos, quantidadeCiclosNascidos) {

        let pmlnMedioGeral = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.pesoFilhoteNascimento ? ciclo.pesoFilhoteNascimento : 0);
        }, 0);

        return this.calcularDivisao(pmlnMedioGeral, quantidadeCiclosNascidos);
    }

    static obterPLD(ciclos, quantidadeCiclosDesmamados) {

        let pmldMedioGeral = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.pesoFilhoteDesmamado ? ciclo.pesoFilhoteDesmamado : 0);
        }, 0);

        return this.calcularDivisao(pmldMedioGeral, quantidadeCiclosDesmamados);
    }

    static obterTaxaMortalidade(ciclos) {

        let quantidadeNascidos = this.obterQuantidadeNascidos(ciclos);
        let quantidadeMortos = this.obterQuantidadeMortos(ciclos);

        return this.calcularDivisao((quantidadeMortos * 100), quantidadeNascidos);
    }

    static obterTaxaParicao(ciclos) {

        let totalParido = this.obterQuantidadePartos(ciclos);

        let totalNaoParido = ciclos.reduce((sum, ciclo) => {
            return sum + (!ciclo.dataPartoReal && !ciclo.ativo ? 1 : 0);
        }, 0);

        return this.calcularDivisao((totalParido * 100), totalParido + totalNaoParido);
    }

    static obterTaxaAborto(ciclos) {

        let totalAborto = ciclos.reduce((sum, ciclo) => {
            return sum + (ciclo.aborto ? 1 : 0);
        }, 0);

        return this.calcularDivisao((totalAborto * 100), ciclos.length);
    }

    static obterTaxaRetornoCio(ciclos) {

        let total = ciclos.length;

        let totalNaoRetornado = ciclos.reduce((sum, ciclo) => {
            return sum + (!ciclo.dataPartoReal && ciclo.ativo ? 1 : 0);
        }, 0);

        let totalRetornado = ciclos.reduce((sum, ciclo) => {
            return sum + (!ciclo.dataPartoReal && !ciclo.ativo ? 1 : 0);
        }, 0);

        return this.calcularDivisao((totalRetornado * 100), total - totalNaoRetornado);
    }
}