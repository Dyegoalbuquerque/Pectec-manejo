
export class CicloCrescimento {

    constructor() { }

    id;
    femeaId;
    dataNascimento;
    dataEntrada;
    dataEncerramento;
    quantidadeEntrada;
    quantidadeSaida;
    quantidadeAnimalMorto;
    localId;
    valorEntrada;
    valorSaida;
    pesoAnimalEntrada;
    pesoLoteEntrada;
    pesoAnimalSaida;
    pesoLoteSaida;
    ativo;
    quantidadeSeparado;
    quantidadeSemDestino;

    gerarCiclo(cicloReproducao) {

        if (cicloReproducao.dataDesmameReal) {

            this.ativo = true;
            this.dataNascimento = cicloReproducao.dataPartoReal;
            this.femeaId = cicloReproducao.femeaId;
            this.dataEntrada = cicloReproducao.dataDesmameReal;
            this.pesoAnimalEntrada = cicloReproducao.pesoFilhoteDesmamado;
            this.pesoLoteEntrada = cicloReproducao.pesoLeitegadaDesmamado;
            this.quantidadeEntrada = cicloReproducao.quantidadeDesmamado;
            this.valorEntrada = cicloReproducao.valorSaida;
        }
    }

    calcularQuantidadeAnimalAtual() {

        let entrada = this.quantidadeEntrada ? this.quantidadeEntrada : 0;
        let saida = this.quantidadeSaida ? this.quantidadeSaida : 0;
        let semDestino = this.quantidadeSemDestino ? this.quantidadeSemDestino : 0;
        let mortos = this.quantidadeAnimalMorto ? this.quantidadeAnimalMorto : 0;

        let quantidade = entrada - (saida + semDestino + mortos);

        return quantidade;
    }
}