
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
    local;
    valorEntrada;
    valorSaida;
    pesoAnimalEntrada;
    pesoLoteEntrada;
    pesoAnimalSaida;
    pesoLoteSaida;
    ativo;
    quantidadeSeparado;
    quantidadeSemDestino;

    definirDataEncerramento(dataNascimento){
        let dataDeInicio = new Date(dataNascimento);
        let diasAteEncerrar = dataDeInicio.getDate() - 1 + 64;

        this.dataEncerramento = dataDeInicio;
        this.dataEncerramento.setDate(diasAteEncerrar);
    }

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
            this.definirDataEncerramento(this.dataNascimento);
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