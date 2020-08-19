
export class UCDto {

    constructor() {
    }

    montarCicloCrescimento(ciclo) {

        return {
            id: ciclo.id,
            reprodutorId: ciclo.reprodutorId,
            femeaId: ciclo.femeaId,
            dataFecundacao: ciclo.dataFecundacao,
            dataPartoPrevisao: ciclo.dataPartoPrevisao,
            dataPartoReal: ciclo.dataPartoReal,
            dataDesmamePrevisao: ciclo.dataDesmamePrevisao,
            dataDesmameReal: ciclo.dataDesmameReal,
            dataFinalIDC: ciclo.dataFinalIDC,
            dataFinalIdcPrevisao: ciclo.dataFinalIdcPrevisao,
            ativo: ciclo.ativo,
            inceminacao: ciclo.inceminacao,
            procedenciaReprodutor: ciclo.procedenciaReprodutor,
            quantidadeFilhote: ciclo.quantidadeFilhote,
            quantidadeFilhoteVV: ciclo.quantidadeFilhoteVV,
            quantidadeFilhoteNM: ciclo.quantidadeFilhoteNM,
            quantidadeFilhoteMF: ciclo.quantidadeFilhoteMF,
            pesoFilhoteNascimento: ciclo.pesoFilhoteNascimento,
            pesoLeitegadaNascimento: ciclo.pesoLeitegadaNascimento,
            pesoFilhoteDesmamado: ciclo.pesoFilhoteDesmamado,
            pesoLeitegadaDesmamado: ciclo.pesoLeitegadaDesmamado,
            quantidadeFilhoteMorto: ciclo.quantidadeFilhoteMorto,
            quantidadeSexoM: ciclo.quantidadeSexoM,
            quantidadeSexoF: ciclo.quantidadeSexoF,
            quantidadeDoado: ciclo.quantidadeDoado,
            quantidadeAdotado: ciclo.quantidadeAdotado,
            numeroFemeaAdocao: ciclo.numeroFemeaAdocao,
            quantidadeDesmamado: ciclo.quantidadeDesmamado,
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