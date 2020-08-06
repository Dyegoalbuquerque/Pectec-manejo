
export class DataHelper {

    constructor() { }

    static calcularDiasPorData = (data) => {

        var hoje = new Date();
        var dataParametro = new Date(data);

        var subtracao = Math.abs(hoje.getTime() - dataParametro.getTime());
        return Math.ceil(subtracao / (1000 * 60 * 60 * 24));
    }


    static obterNomeMesPtBr = (month) => {

        switch (month) {
            case 0: return "Janeiro";
            case 1: return "Fevereiro";
            case 2: return "Março";
            case 3: return "Abril";
            case 4: return "Maio";
            case 5: return "Junho";
            case 6: return "Julho";
            case 7: return "Agosto";
            case 8: return "Setembro";
            case 9: return "Outubro";
            case 10: return "Novembro";
            case 11: return "Dezembro";
        }
        return "";
    }

    static saoIguais = (dataUm, dataDois) => {

        dataUm = new Date(dataUm);
        dataDois = new Date(dataDois);

        let dateOne = new Date(dataUm.getDate(), dataUm.getMonth() + 1, dataUm.getFullYear());
        let dateTwo = new Date(dataDois.getDate(), dataDois.getMonth() + 1, dataDois.getFullYear());

        return dateOne.getTime() == dateTwo.getTime();
    }
}