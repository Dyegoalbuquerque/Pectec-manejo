import { EstoqueRepository } from '../repositorys/estoque-repository';
import { ConsumoRepository } from '../repositorys/consumo-repository';
import { SubcategoriaRepository } from '../repositorys/subCategoria-repository';
import { Consumo } from '../models/consumo';
import { Model } from '../models/model';
import { EstoqueDto } from '../dtos/estoqueDto';

export class EstoqueService {

    constructor(container) {
        this.estoqueRepository = container.get(EstoqueRepository);
        this.consumoRepository = container.get(ConsumoRepository);
        this.subcategoriaRepository = container.get(SubcategoriaRepository);
        this.estoqueDto = container.get(EstoqueDto);
    }


    obterEstoqueRealPorCategoria = async (codigoCategoria) => {

        let subcategorias = await this.subcategoriaRepository.obterPorCodigoCategoria(codigoCategoria);
        let subcategoriaIds = subcategorias.map(i => i.id);

        let result = await this.estoqueRepository.obterEstoqueReal(subcategoriaIds);

        for (let i = 0; i < result.length; i++) {

            for (let ii = 0; ii < subcategorias.length; ii++) {

                if (result[i].subcategoriaId == subcategorias[ii].id) {
                    result[i].subcategoria = subcategorias[ii];
                }
            }
        }

        return this.estoqueDto.montarEstoques(result);
    }

    obterEstoquePorCategoria = async (categoriaId) => {

        let subcategorias = await this.subcategoriaRepository.obterPorCategoria(categoriaId);
        let subcategoriaIds = subcategorias.map(i => i.id);
        let result = await this.estoqueRepository.obterPorSubcategorias(subcategoriaIds);

        for (let i = 0; i < result.length; i++) {

            for (let ii = 0; ii < subcategorias.length; ii++) {

                if (result[i].subcategoriaId == subcategorias[ii].id) {
                    result[i].subcategoria = subcategorias[ii];
                }
            }
        }

        
        return this.estoqueDto.montarEstoques(result);
    }

    obterOrigens = async (categoriaId) => {
        let subcategorias = await this.subcategoriaRepository.obterPorCategoria(categoriaId);
        let subcategoriaIds = subcategorias.map(i => i.id);
        let result = await this.estoqueRepository.obterEstoqueReal(subcategoriaIds);

        return this.estoqueDto.montarEstoques(result);
    }

    obterOrigem = async (id) => {
        let estoque = await this.estoqueRepository.obterPorId(id);

        return this.estoqueDto.montarEstoque(estoque);
    }

    salvarRacao = async (item) => {

        item.dataCadastro = new Date();

        if (item.comprado || item.sobra) {
            item.quantidadeEntrada = item.quantidade * item.quantidadeEmbalagem;
            item.quantidadeEntradaReal = item.quantidadeEntrada;
            item.valorUnitario = item.valorEmbalagem / item.quantidadeEmbalagem;

        } else {

            item.comprado = false;
            let quantidadeTotal = 0;
            let valorTotalRacao = 0;

            for (let i = 0; i < item.consumos.length; i++) {

                let consumoRecebido = item.consumos[i];

                let consumo = new Consumo();
                consumo.quantidade = consumoRecebido.quantidade;
                consumo.origemId = consumoRecebido.origemId;
                consumo.data = item.dataEntrada;
                consumo.categoriaId = 1;
                await this.consumoRepository.salvar(consumo);


                let estoque = await this.estoqueRepository.obterPorId(consumo.origemId);
                estoque.quantidadeEntradaReal = estoque.quantidadeEntradaReal - consumo.quantidade;
                await this.estoqueRepository.atualizar(estoque);

                quantidadeTotal += consumo.quantidade;
                valorTotalRacao += estoque.valorUnitario * consumo.quantidade;
            }

            item.quantidadeEntrada = quantidadeTotal;
            item.quantidadeEntradaReal = item.quantidadeEntrada;
            item.quantidade = item.quantidadeEntrada / item.quantidadeEmbalagem;
            item.valorUnitario = valorTotalRacao / item.quantidadeEntrada;
            item.valorEmbalagem = item.valorUnitario * item.quantidadeEmbalagem;
        }

        item.quantidade = parseFloat(item.quantidade.toFixed(2));
        item.valorUnitario = parseFloat(item.valorUnitario.toFixed(2));
        item.valorEmbalagem = parseFloat(item.valorEmbalagem.toFixed(2));

        let id = await this.estoqueRepository.salvar(item);

        return id;
    }

    salvarEstoque = async (item) => {

        item.comprado = true;
        item.quantidadeEntrada = item.quantidade * item.quantidadeEmbalagem;
        item.quantidadeEntradaReal = item.quantidadeEntrada;
        item.valorUnitario = item.valorEmbalagem / item.quantidadeEmbalagem;
        item.dataCadastro = new Date();

        let id = await this.estoqueRepository.salvar(item);

        return id;
    }

    obterConsumos = async (parametroQuery) => {

        parametroQuery.metodoOrdenar = parametroQuery.ordenar == 'asc' ? 
                                       Consumo.ordenarAsc : parametroQuery.ordenar == 'desc' ? 
                                       Consumo.ordenarDesc : Model.ordenar;

        let resultado = await this.consumoRepository.obterComFiltro(parametroQuery);

        let estoqueIds = resultado.resultado.map(i => i.origemId);
        let origens = await this.estoqueRepository.obterPorIds(estoqueIds);

        let subcategorias = await this.subcategoriaRepository.obterTodasSubcategorias();

        for (let i = 0; i < origens.length; i++) {

            for (let o = 0; o < subcategorias.length; o++) {

                if (origens[i].subcategoriaId == subcategorias[o].id) {
                    origens[i].subcategoria = subcategorias[o];
                }
            }
        }

        for (let l = 0; l < resultado.resultado.length; l++) {

            for (let n = 0; n < origens.length; n++) {

                if (resultado.resultado[l].origemId == origens[n].id) {
                    resultado.resultado[l].origem = origens[n];
                }
            }
        }

        return this.estoqueDto.montarConsumosComQuery(resultado);
    }

    salvarConsumo = async (item) => {

        delete item.origem;
        let id = await this.consumoRepository.salvar(item);

        let estoque = await this.estoqueRepository.obterPorId(item.origemId);

        let descontadoQuantidadeReal = estoque.quantidadeEntradaReal - item.quantidade;
        estoque.quantidadeEntradaReal = parseFloat(descontadoQuantidadeReal.toFixed(2));

        await this.estoqueRepository.atualizar(estoque);

        return id;
    }

    atualizarConsumo = async (item) => {

        let evento = await this.consumoRepository.obterPorId(item.id);
        let id = await this.consumoRepository.atualizar(item);

        let estoque = await this.estoqueRepository.obterPorId(item.origemId);

        estoque.quantidadeEntradaReal += evento.quantidade;
        estoque.quantidadeEntradaReal -= item.quantidade;

        await this.estoqueRepository.atualizar(estoque);

        return id;
    }
}