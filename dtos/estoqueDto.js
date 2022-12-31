
export class EstoqueDto {

    constructor() { }

    montarConsumo(consumo) {

        return {
            id: consumo.id,
            data: consumo.data,
            descricao: consumo.origem.subcategoria.descricao,
            quantidade: consumo.quantidade,
            unidadeMedida: consumo.origem.unidadeMedida,
            origemId: consumo.origemId,
            valor: consumo.valor,
            valorUnitario: consumo.origem.valorUnitario,
            categoriaId: consumo.categoriaId
        }
    }

    montarConsumosComQuery(resultadoQuery) {

        let itens = [];

        for (let i = 0; i < resultadoQuery.resultado.length; i++) {
            let consumo = resultadoQuery.resultado[i];
            itens.push(this.montarConsumo(consumo));
        }
        resultadoQuery.resultado = itens;
        
        return resultadoQuery;
    }

    montarEstoques(estoques) {
        let itens = [];

        for (let i = 0; i < estoques.length; i++) {
            let estoque = estoques[i];
            itens.push(this.montarEstoque(estoque));
        }

        return itens;
    }

    montarEstoque(estoque) {

        return {
            id: estoque.id,
            subcategoria: estoque.subcategoria,
            quantidadeEntradaReal: estoque.quantidadeEntradaReal
        }
    }
}