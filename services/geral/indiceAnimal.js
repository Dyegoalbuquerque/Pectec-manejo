
export class IndiceAnimal {

    static obterQuantidadeMarra(animais) {
        return animais.filter(f => f.tag == 'M').length;;
    }

    static obterQuantidadeGestacao(animais) {
        return animais.filter(f => f.tag == 'G').length;;
    }

    static obterQuantidadeLactacao(animais) {
        return animais.filter(f => f.tag == 'L').length;;
    }

    static obterQuantidadeConfirmacaoGestacao(animais) {
        return animais.filter(f => f.tag == 'CG').length;;
    }

    static obterQuantidadeIDC(animais) {
        return animais.filter(f => f.tag == 'IDC').length;;
    }
}