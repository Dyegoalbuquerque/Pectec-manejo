
export class QueryHelper {

    constructor() { }

    static aplicarQuery(lista, parametroQuery) {
        lista = lista.sort(parametroQuery.metodoOrdenar);

        let total = lista.length;
        let inicio = (parametroQuery.pagina * parametroQuery.limite) - parametroQuery.limite;
        let filtrados = lista.slice(inicio, inicio + parametroQuery.limite);
        
        return {
            resultado: filtrados,
            total: total,
            pagina: parametroQuery.pagina,
            limite: parametroQuery.limite,
            ordenar: parametroQuery.ordenar
        };
    }
}