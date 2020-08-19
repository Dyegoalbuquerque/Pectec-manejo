
export class UCDto {

    constructor() {
    }

    montarCicloCrescimento(ciclo) {

        return {
            id: ciclo.id,
            femeaId: ciclo.femeaId,
            dataNascimento: ciclo.dataNascimento,
            dataEntrada: ciclo.dataEntrada,
            dataEncerramento: ciclo.dataEncerramento,
            ativo: ciclo.ativo,
            quantidadeEntrada: ciclo.quantidadeEntrada,
            quantidadeSaida: ciclo.quantidadeSaida,
            quantidadeAnimalMorto: ciclo.quantidadeAnimalMorto,
            quantidadeSeparado: ciclo.quantidadeSeparado,
            quantidadeSemDestino: ciclo.quantidadeSemDestino,
            valorEntrada: ciclo.valorEntrada,
            valorSaida: ciclo.valorSaida
        }
    }

    montarCiclosCrescimento(ciclos) {
        let itens = [];

        for (let i = 0; i < ciclos.length; i++) {
            let ciclo = ciclos[i];
            itens.push(this.montarCicloCrescimento(ciclo));
        }

        return itens;
    }

    montarRelatorioUC(resumoRelatorio, dataInicial, dataFinal) {

        return {
            quantidadeAnimais: resumoRelatorio.quantidadeAnimais,
            taxaMortalidade: resumoRelatorio.taxaMortalidade,
            dataInicial: dataInicial,
            dataFinal: dataFinal
        }
    }
}