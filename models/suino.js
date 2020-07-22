import { Animal } from './animal';
import { Constantes } from '../constantes';

export class Suino extends Animal {

    constructor() { 
        super();
    }

    taNaFaseMaternidade(idade) {
        return idade >= 1 && idade < 30  && !this.taNaEmObito() && !this.taVendido();
    }

    taNaFaseCreche(idade) {
        return idade >= 30 && idade < 64  && !this.taNaEmObito() && !this.taVendido();
    }

    taNaFaseTerminacao(idade) {
        return idade >= 64 && this.situacao == "T" && !this.taNaEmObito() && !this.taVendido();
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

        if(this.taNaFaseMaternidade(idade)){
            this.situacao = "AM";
        }else if(this.taNaFaseCreche(idade)){
            this.situacao = "AC";
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
        }else if(this.taNaFaseMarra(idade)){
            this.situacao = "M";
        }else if(this.taNaFaseRecria(idade)){
            this.situacao = "R";
        }else if(this.taVendido()){
            this.situacao = "V";
        }
    }
}