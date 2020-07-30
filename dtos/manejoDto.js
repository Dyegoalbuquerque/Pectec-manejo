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

    montarRelatorioUpl(resumoAnimais, resumoCiclos) {

        return {
            quantidadeTotalMatriz: resumoAnimais.quantidadeTotalMatriz,
            quantidadeTotalReprodutor: resumoAnimais.quantidadeTotalReprodutor,
            quantidadeTotalMarra: resumoAnimais.quantidadeTotalMarra,
            quantidadeTotalGestacao: resumoAnimais.quantidadeTotalGestacao,
            quantidadeTotalLactacao: resumoAnimais.quantidadeTotalLactacao,
            quantidadeTotalConfirmacaoGestacao: resumoAnimais.quantidadeTotalConfirmacaoGestacao,
            quantidadeTotalIDC: resumoAnimais.quantidadeTotalIDC,
            quantidadeTotalLeitaoVivo: resumoCiclos.quantidadeTotalLeitaoVivo,
            nlnMedioGeral: resumoCiclos.nlnMedioGeral,
            nldMedioGeral: resumoCiclos.nldMedioGeral,
            plnMedioGeral: resumoCiclos.plnMedioGeral,
            pmlnMedioGeral: resumoCiclos.pmlnMedioGeral,
            pldMedioGeral: resumoCiclos.pldMedioGeral,
            pmldMedioGeral: resumoCiclos.pmldMedioGeral
        }
    }
}