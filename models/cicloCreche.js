
export class CicloCreche {

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
    tempoCiclo;

    calcularQuantidadeAnimalAtual() {

        let entrada = this.quantidadeEntrada ? this.quantidadeEntrada : 0;
        let saida = this.quantidadeSaida ? this.quantidadeSaida : 0;
        let semDestino = this.quantidadeSemDestino ? this.quantidadeSemDestino : 0;
        let mortos = this.quantidadeAnimalMorto ? this.quantidadeAnimalMorto : 0;

        let quantidade = entrada - (saida + semDestino + mortos);

        return quantidade;
    }
}