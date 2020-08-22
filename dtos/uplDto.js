
export class UplDto {

    constructor() {
    }

    montarAnimal(animal) {

        return {
            id: animal.id,
            maeId: animal.maeId,
            paiId: animal.paiId,
            tag: animal.tag,
            sexo: animal.sexo,
            raca: animal.raca,
            numero: animal.numero,
            dataNascimento: animal.dataNascimento,
            acompanhamentos: animal.acompanhamentos
        }
    }

    montarAnimais(animais) {
        let itens = [];

        for (let i = 0; i < animais.length; i++) {
            let animal = animais[i];
            itens.push(this.montarAnimal(animal));
        }

        return itens;
    }

    montarCicloReproducao(ciclo) {

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

    montarCiclosReproducao(ciclos) {
        let itens = [];

        for (let i = 0; i < ciclos.length; i++) {
            let ciclo = ciclos[i];
            itens.push(this.montarCicloReproducao(ciclo));
        }

        return itens;
    }

    montarCausaObito(causa) {
        return {
            id: causa.id,
            codigo: causa.codigo,
            nome: causa.nome,
            descricao: causa.descricao
        }
    }

    montarProgramaItem(programaItem) {
        return {
            id: programaItem.id,
            programaId: programaItem.programaId,
            descricao: programaItem.descricao,
            observacao: programaItem.observacao,
            tempoOcorrencia: programaItem.tempoOcorrencia,
            tagId: programaItem.tagId,
            quantidade: programaItem.quantidade,
            ativo: programaItem.ativo,
            objetivoId: programaItem.objetivoId,
            objetivo: programaItem.objetivo
        }
    }

    montarProgramasItens(programaItens) {
        let itens = [];

        for (let i = 0; i < programaItens.length; i++) {
            let programaItem = programaItens[i];
            itens.push(this.montarProgramaItem(programaItem));
        }

        return itens;
    }

    montarCausasObitos(causas) {
        let itens = [];

        for (let i = 0; i < causas.length; i++) {
            let causa = causas[i];
            itens.push(this.montarCausaObito(causa));
        }

        return itens;
    }

    montarTag(tag) {
        return {
            id: tag.id,
            setores: tag.setores,
            descricao: tag.descricao,
            nome: tag.nome,
            sigla: tag.sigla,
        }
    }

    montarTags(tags) {
        let itens = [];

        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            itens.push(this.montarTag(tag));
        }

        return itens;
    }

    montarTagQuantidade(tag, animais) {
        return {
            id: tag.id,
            setores: tag.setores,
            descricao: tag.descricao,
            nome: tag.nome,
            sigla: tag.sigla,
            quantidade: animais.filter(a => a.tag == tag.sigla).length
        }
    }

    montarTagsQuantidade(tags, animais) {
        let itens = [];

        for (let i = 0; i < tags.length; i++) {
            let tag = tags[i];
            itens.push(this.montarTagQuantidade(tag, animais));
        }

        return itens;
    }

    montarPrograma(programa) {
        return {
            id: programa.id,
            dataCadastro: programa.dataCadastro,
            nome: programa.nome,
            itens: programa.itens,
            inativo: programa.inativo
        }
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
            taxaMortalidade: resumoRelatorio.taxaMortalidade,
            taxaRetornoCio: resumoRelatorio.taxaRetornoCio,
            taxaAborto: resumoRelatorio.taxaAborto,
            taxaParicao : resumoRelatorio.taxaParicao,
            dataInicial: dataInicial,
            dataFinal: dataFinal
        }
    }

    montarRelatorioMatrizes(itens, dataInicial, dataFinal){
        return {
            dataInicial,
            dataFinal,
            itens
        };
    }
}