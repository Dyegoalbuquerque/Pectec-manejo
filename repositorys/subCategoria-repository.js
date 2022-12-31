import caller from 'grpc-caller';

export class SubcategoriaRepository{

    constructor() {
        this.client = caller('127.0.0.1:50052', './configuracao.proto', 'ConfiguracaoService')
    }

    obterPorId = async (id) => {
        let parametro = {id: id};
        const result = await this.client.obterSubcategoriaPorId(parametro);
        return result;
    }
    
    obterPorCodigoCategoria = async (codigo) => {
        let parametro = {codigoCategoria: codigo};
        const result = await this.client.obterSubcategoriasPorCodigoCategoria(parametro);
        return result.subcategorias;
    }

     obterPorCategoria = async (categoriaId) => {
        const result = await this.client.obterSubcategoriasPorCategoria({categoriaId: categoriaId});
        return result.subcategorias;
    }

    obterTodasSubcategorias = async () => {
        const result = await this.client.obterTodasSubcategorias({});
        return result.subcategorias;
    }
}