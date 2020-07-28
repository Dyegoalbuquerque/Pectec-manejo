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

    taNaFaseIDC(idade) {
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
}