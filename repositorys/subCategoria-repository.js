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
}