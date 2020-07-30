import { DataHelper } from '../helpers/dataHelper';

export class ManejoDto {

    constructor() {
    }

    montarAnimal(animal) {

        return {
            id: animal.id,
            maeId: animal.maeId,
            paiId: animal.paiId,
            situacao: animal.situacao,
            raca: animal.raca,
            dataNascimento: animal.dataNascimento
        }
    }

    montarLoteVenda(lotes) {

        let itens = [];

        for(let i =0; i < lotes.length; i++) {
            let item = lotes[i];

            let lote = {
                id: item.id,
                dias: DataHelper.calcularDiasPorData(item.dataNascimento),
                quantidade: item.identificacoes.length,
                dataNascimento: item.dataNascimento
            }
            itens.push(lote);
        }

        return itens;
    }

    montarRelatorioUpl(resumoRelatorio, dataInicial, dataFinal) {

        return {
            quantidadeTotalMatriz: resumoRelatorio.quantidadeTotalMatriz,
            quantidadeTotalReprodutor: resumoRelatorio.quantidadeTotalReprodutor,
            quantidadeTotalMarra: resumoRelatorio.quantidadeTotalMarra,
            quantidadeTotalGestacao: resumoRelatorio.quantidadeTotalGestacao,
            quantidadeTotalLactacao: resumoRelatorio.quantidadeTotalLactacao,
            quantidadeTotalConfirmacaoGestacao: resumoRelatorio.quantidadeTotalConfirmacaoGestacao,
            quantidadeTotalIDC: resumoRelatorio.quantidadeTotalIDC,
            quantidadeTotalLeitaoVivo: resumoRelatorio.quantidadeTotalLeitaoVivo,
            nlnMedioGeral: resumoRelatorio.nlnMedioGeral,
            nldMedioGeral: resumoRelatorio.nldMedioGeral,
            plnMedioGeral: resumoRelatorio.plnMedioGeral,
            pmlnMedioGeral: resumoRelatorio.pmlnMedioGeral,
            pldMedioGeral: resumoRelatorio.pldMedioGeral,
            pmldMedioGeral: resumoRelatorio.pmldMedioGeral,
            dataInicial: dataInicial,
            dataFinal: dataFinal
        }
    }
}