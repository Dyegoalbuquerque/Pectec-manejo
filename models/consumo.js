import { Model } from "./model";


export class Consumo extends Model{

    constructor() { 
        super();
    }
    id;
    data;
    quantidade;
    destino;
    destinoId;
    categoriaId;
    categoria;
    origemId;
    origem;
    valor;

    static ordenarAsc = (a, b) => {
        return new Date(a.data).getTime() - new Date(b.data).getTime();
    }

    static ordenarDesc = (a, b) => {
        return new Date(b.data).getTime() - new Date(a.data).getTime();
    }
}
