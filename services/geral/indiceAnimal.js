
export class IndiceAnimal {

    static obterQuantidadeMarra(animais) {
        return animais.filter(f => f.situacao == 'M').length;;
    }

    static obterQuantidadeGestacao(animais) {
        return animais.filter(f => f.situacao == 'G').length;;
    }

    static obterQuantidadeLactacao(animais) {
        return animais.filter(f => f.situacao == 'L').length;;
    }

    static obterQuantidadeConfirmacaoGestacao(animais) {
        return animais.filter(f => f.situacao == 'CG').length;;
    }

    static obterQuantidadeIDC(animais) {
        return animais.filter(f => f.situacao == 'IDC').length;;
    }
}