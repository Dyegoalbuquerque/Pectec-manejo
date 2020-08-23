

export class CicloReproducao {

    constructor() { }

    id;
    reprodutorId;
    femeaId;
    dataFecundacao;
    dataPartoPrevisao;
    dataPartoReal;
    dataDesmamePrevisao;
    dataDesmameReal;
    dataFinalIDC;
    dataFinalIdcPrevisao;
    ativo;
    aborto;
    inceminacao;
    procedenciaReprodutor;
    quantidadeFilhote;
    quantidadeFilhoteVV;
    quantidadeFilhoteNM;
    quantidadeFilhoteMF;
    pesoFilhoteNascimento;
    pesoLeitegadaNascimento;
    pesoFilhoteDesmamado;
    pesoLeitegadaDesmamado;
    quantidadeFilhoteMorto;
    quantidadeSexoM;
    quantidadeSexoF;
    quantidadeDoado;
    quantidadeAdotado;
    numeroFemeaAdocao;
    quantidadeDesmamado;
    valorSaida;

    existeDesmamados() {
        return this.quantidadeDesmamado ? true : false;
    }

    existeDataParto() {
        return this.dataPartoReal ? true : false;
    }

    alterouDataFecundacao(cicloAtual) {
        return this.dataFecundacao != cicloAtual.dataFecundacao;
    }

    alterouDataParto(cicloAtual) {
        return this.dataPartoReal != cicloAtual.dataPartoReal;
    }

    alterouDataDesmame(cicloAtual) {
        return this.dataDesmameReal != cicloAtual.dataDesmameReal;
    }

    alterouEstado(cicloAtual) {
        return this.alterouDataFecundacao(cicloAtual) || this.alterouDataParto(cicloAtual) || this.alterouDataDesmame(cicloAtual);
    }

    pariu(cicloAtual) {
        let semData = !cicloAtual.dataPartoReal;
        return this.dataPartoReal && semData;
    }

    programarCiclo(especie) {

        let diasGestacao = especie.diasGestacao;
        let diasLactacao = especie.diasLactacao;
        let diasIDCPrevisao = especie.diasIDC;

        this.dataFecundacao = new Date(this.dataFecundacao);
        let totalDiasAteParto = this.dataFecundacao.getDate() + diasGestacao - 1;
        let totalDiasAteDesmamar = totalDiasAteParto + diasLactacao;
        let totalDiasAteIDC = totalDiasAteDesmamar + diasIDCPrevisao;

        this.dataPartoPrevisao = new Date(this.dataFecundacao);
        this.dataPartoPrevisao.setDate(totalDiasAteParto);

        this.dataDesmamePrevisao = new Date(this.dataFecundacao);
        this.dataDesmamePrevisao.setDate(totalDiasAteDesmamar);

        this.dataFinalIdcPrevisao = new Date(this.dataFecundacao);
        this.dataFinalIdcPrevisao.setDate(totalDiasAteIDC);

        this.ativo = true;

        if (this.reprodutorId != undefined) {
            this.inceminacao = false;
        }

        let subtracao = Math.abs(new Date(this.dataPartoReal).getTime() - this.dataFecundacao.getTime());
        let dias = Math.ceil(subtracao / (1000 * 60 * 60 * 24));

        diasGestacao = !this.dataPartoReal ? diasGestacao : dias;

        if (this.dataDesmameReal) {
            this.ativo = false;
        }

        if (!this.dataPartoReal) {
            this.quantidadeFilhote = 0;
            this.quantidadeFilhoteVV = 0;
            this.quantidadeFilhoteNM = 0;
            this.quantidadeFilhoteMF = 0;
            this.pesoFilhoteNascimento = 0;
            this.quantidadeDoado = 0;
            this.quantidadeAdotado = 0;
        }

        if (!this.quantidadeFilhoteMorto) {
            this.quantidadeFilhoteMorto = 0;
        }
    }

    calcularQuantidadeFilhotesAtual() {

        let vivos = this.quantidadeFilhoteVV ? this.quantidadeFilhoteVV : 0;
        let adotados = this.quantidadeAdotado ? this.quantidadeAdotado : 0;
        let doados = this.quantidadeDoado ? this.quantidadeDoado : 0;
        let mortos = this.quantidadeFilhoteMorto ? this.quantidadeFilhoteMorto : 0;
        let desmamados = this.quantidadeDesmamado ? this.quantidadeDesmamado : 0;

        let quantidade = (vivos + adotados) - (mortos + doados + desmamados);

        return quantidade;
    }
}