
export class DataHelper {

    constructor() {}

    static calcularDiasPorData(data) {

        var hoje = new Date();
        var dataNascimento = new Date(data);

        var subtracao = Math.abs(hoje.getTime() - dataNascimento.getTime());
        return Math.ceil(subtracao / (1000 * 60 * 60 * 24));
    }
}