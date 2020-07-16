

export class CicloReproducao {

    constructor() { }

    id;
    reprodutorId;
    femeaId;
    diasGestacao;
    diasLactacao;
    diasRecriaPrevisao;
    dataFecundacao;
    dataPartoPrevisao;
    dataPartoReal;
    dataApartarPrevisao;
    dataApartarReal;
    dataRecria;
    ativo;
    inceminacao;
    procedenciaReprodutor;
    quantidadeFilhote;
    quantidadeFilhoteVV;
    quantidadeFilhoteNM;
    quantidadeFilhoteMF;
    pesoFilhoteNascimento;
    pesoFilhoteApartar;
    quantidadeFilhoteMorto;
    quantidadeSexoM;
    quantidadeSexoF;
    situacaoNascimento;
    quantidadeDoado;
    quantidadeAdotado;
    numeroFemeaAdocao;

    existeDataParto(){
        return this.dataPartoReal ? true : false;
    }

    alterouDataFecundacao(acompanhamento){
        return this.dataFecundacao != acompanhamento.dataFecundacao;
    }

    alterouDataParto(acompanhamento){
        return this.dataPartoReal != acompanhamento.dataPartoReal;
    }

    alterouDataApartar(acompanhamento){
        return this.dataApartarReal != acompanhamento.dataApartarReal;
    }

    alterouEstado(acompanhamento) {
        return this.alterouDataFecundacao(acompanhamento) || this.alterouDataParto(acompanhamento) || this.alterouDataApartar(acompanhamento);
    }

    pariu(acompanhamentoAtual) {
        let semData = !acompanhamentoAtual.dataPartoReal;
        return this.dataPartoReal && semData;
    }

    programarAcompanhamento(especie){
  
        this.diasGestacao = especie.diasGestacao;
        this.diasLactacao = especie.diasLactacao;
        this.diasRecriaPrevisao = especie.diasRecria;

        this.situacaoNascimento = 12;
  
        this.dataFecundacao = new Date(this.dataFecundacao);
        let totalDiasAteParto = this.dataFecundacao.getDate() + this.diasGestacao -1;
        let totalDiasAteApartar = totalDiasAteParto + this.diasLactacao;
        let totalDiasAteRecriar = totalDiasAteApartar + this.diasRecriaPrevisao;
  
        this.dataPartoPrevisao = new Date(this.dataFecundacao);
        this.dataPartoPrevisao.setDate(totalDiasAteParto);
  
        this.dataApartarPrevisao = new Date(this.dataFecundacao);
        this.dataApartarPrevisao.setDate(totalDiasAteApartar);
  
        this.dataRecriaPrevisao = new Date(this.dataFecundacao);
        this.dataRecriaPrevisao.setDate(totalDiasAteRecriar);
  
        this.ativo = true;
  
        if (this.reprodutorId != undefined) {
           this.inceminacao = false;
        }
  
        let subtracao = Math.abs(new Date(this.dataPartoReal).getTime() - this.dataFecundacao.getTime());
        let dias = Math.ceil(subtracao / (1000 * 60 * 60 * 24));
  
        this.diasGestacao = !this.dataPartoReal ? this.diasGestacao : dias;
  
        if (this.dataApartarReal) {
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
}