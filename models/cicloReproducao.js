

export class CicloReproducao {

    constructor() { }

    id;
    reprodutorId;
    femeaId;
    dataFecundacao;
    dataPartoPrevisao;
    dataPartoReal;
    dataApartarPrevisao;
    dataApartarReal;
    dataFinalIDC;
    dataFinalIdcPrevisao
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
    quantidadeDoado;
    quantidadeAdotado;
    numeroFemeaAdocao;
    quantidadeApartado;
    valorApartado;

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

    programarCiclo(especie){
  
        let diasGestacao = especie.diasGestacao;
        let diasLactacao = especie.diasLactacao;
        let diasIDCPrevisao = especie.diasIDC;
  
        this.dataFecundacao = new Date(this.dataFecundacao);
        let totalDiasAteParto = this.dataFecundacao.getDate() + diasGestacao -1;
        let totalDiasAteApartar = totalDiasAteParto + diasLactacao;
        let totalDiasAteIDC = totalDiasAteApartar + diasIDCPrevisao;
  
        this.dataPartoPrevisao = new Date(this.dataFecundacao);
        this.dataPartoPrevisao.setDate(totalDiasAteParto);
  
        this.dataApartarPrevisao = new Date(this.dataFecundacao);
        this.dataApartarPrevisao.setDate(totalDiasAteApartar);
  
        this.dataFinalIdcPrevisao = new Date(this.dataFecundacao);
        this.dataFinalIdcPrevisao.setDate(totalDiasAteIDC);
  
        this.ativo = true;
  
        if (this.reprodutorId != undefined) {
           this.inceminacao = false;
        }
  
        let subtracao = Math.abs(new Date(this.dataPartoReal).getTime() - this.dataFecundacao.getTime());
        let dias = Math.ceil(subtracao / (1000 * 60 * 60 * 24));
  
        diasGestacao = !this.dataPartoReal ? diasGestacao : dias;
  
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