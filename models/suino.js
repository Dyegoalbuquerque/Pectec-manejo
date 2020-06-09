import { Animal } from './animal';
import { Constantes } from '../constantes';

export class Suino extends Animal {

    constructor() { 
        super();
    }

    taNaFaseRecemNascido(idade) {
        return idade > 0 && idade < 7 && !this.taNaEmObito();
    }

    taNaFasePreInicialI(idade) {
        return idade >= 7 && idade < 35  && !this.taNaEmObito() && !this.taVendido();
    }

    taNaFasePreInicialII(idade) {
        return idade >= 35 && idade <= 49  && !this.taNaEmObito() && !this.taVendido();
    }

    taNaFaseInicial(idade) {
        return idade > 50 && idade < 70  && !this.taNaEmObito() && !this.taVendido();
    }

    taNaFaseCrescimento(idade) {
        return idade > 70 && idade < 111  && !this.taNaEmObito() && !this.taVendido();
    }

    taNaFaseTerminacao(idade) {
        return idade >= 111 && this.situacao == "T" && !this.taNaEmObito() && !this.taVendido();
    }

    taNaFaseConfirmacaoGestacao(idade) {
        return idade > 111 && this.sexo == Constantes.SexoFeminino() && this.situacao == "CG" && !this.taNaEmObito() && !this.taVendido();
    }

    taNaFaseGestacao(idade) {
        return idade > 111 && this.sexo == Constantes.SexoFeminino() && this.situacao == "G" && !this.taNaEmObito() && !this.taVendido();
    }

    taNaFaseLactacao(idade) {
        return idade > 111 && this.sexo == Constantes.SexoFeminino() && this.situacao == "L" && !this.taNaEmObito() && !this.taVendido();
    }

    taNaEmObito() {
        return this.situacao == "O";
    }

    taDescontinuado() {
        return this.situacao == "D"  && !this.taNaEmObito() && !this.taVendido();
    }

    taRecemChegado() {
        return this.situacao == "RC"  && !this.taNaEmObito() && !this.taVendido();
    }

    taNaFaseRecria(idade) {
        return !this.taNaFaseMarra(idade) && !this.taNaFaseGestacao(idade) && !this.taNaFaseLactacao(idade) && !this.taVendido();
    }

    taNaFaseMarra(idade) {
        return idade > 111 && this.sexo == Constantes.SexoFeminino() && !this.taNaEmObito() && !this.quantidadeCiclo && !this.taVendido();
    }

    taNaFaseDeReprodutor(idade) {
        return idade > 150 && this.sexo == Constantes.SexoMasculino() && this.situacao == "RP" && !this.taNaEmObito() && !this.taVendido();
    }

    taVendido(){
        return !this.taNaEmObito() && this.situacao == "V";
    }

    atualizarSituacao() {

        let idade = this.calcularIdade();

        if (this.taNaFaseRecemNascido(idade)) {
            this.situacao = "RN";
        }else if(this.taNaFasePreInicialI(idade)){
            this.situacao = "PI";
        }else if(this.taNaFasePreInicialII(idade)){
            this.situacao = "PII";
        }else if(this.taNaFaseInicial(idade)){
            this.situacao = "I";
        }else if(this.taNaFaseCrescimento(idade)){
            this.situacao = "C";
        }else if(this.taNaFaseTerminacao(idade)){
            this.situacao = "T";
        }else if(this.taNaFaseConfirmacaoGestacao(idade)){
            this.situacao = "CG";
        }else if(this.taNaFaseGestacao(idade)){
            this.situacao = "G";
        }else if(this.taNaFaseLactacao(idade)){
            this.situacao = "L";
        }else if(this.taNaEmObito()){
            this.situacao = "O";
        }else if(this.taDescontinuado()){
            this.situacao = "D";
        }else if(this.taNaFaseDeReprodutor(idade)){
            this.situacao = "RP";
        }else if(this.taRecemChegado()){
            this.situacao = "RC";
        }else if(this.taNaFaseMarra(idade)){
            this.situacao = "M";
        }else if(this.taNaFaseRecria(idade)){
            this.situacao = "R";
        }else if(this.taVendido()){
            this.situacao = "V";
        }
    }
}