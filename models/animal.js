

export class Animal {

    constructor() { }
    id;
    maeId;
    paiId;
    especieId;
    tag;
    numero;
    nome;
    raca;
    dataNascimento;
    dataObito;
    causaObitoId;
    sexo;
    quantidadeCiclo;
    procedencia;
    acompanhamentos;
    filhos;
    pertence;

    calcularIdade() {
        var hoje = new Date();
        var dataNascimento = new Date(this.dataNascimento);

        var subtracao = Math.abs(hoje.getTime() - dataNascimento.getTime());
        return Math.ceil(subtracao / (1000 * 60 * 60 * 24));
    }

    atualizarSituacao(){ }
}