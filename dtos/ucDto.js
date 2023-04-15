
export class UCDto {

    constructor() {
    }

    montarCicloCreche(ciclo) {

        return {
            id: ciclo.id,
            femeaId: ciclo.femeaId,
            dataNascimento: ciclo.dataNascimento,
            dataEntrada: ciclo.dataEntrada,
            dataEncerramento: ciclo.dataEncerramento,
            ativo: ciclo.ativo,
            local: ciclo.local,
            quantidadeEntrada: ciclo.quantidadeEntrada,
            quantidadeSaida: ciclo.quantidadeSaida,
            quantidadeAnimalMorto: ciclo.quantidadeAnimalMorto,
            quantidadeSeparado: ciclo.quantidadeSeparado,
            quantidadeSemDestino: ciclo.quantidadeSemDestino,
            valorEntrada: ciclo.valorEntrada,
            valorSaida: ciclo.valorSaida,
            tempoCiclo: ciclo.tempoCiclo,
            localId: ciclo.localId,
            pesoAnimalEntrada: ciclo.pesoAnimalEntrada
        }
    }

    montarCiclosCreche(ciclos) {
        let itens = [];

        for (let i = 0; i < ciclos.length; i++) {
            let ciclo = ciclos[i];
            itens.push(this.montarCicloCreche(ciclo));
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