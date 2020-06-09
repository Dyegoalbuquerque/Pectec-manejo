
import { Repository } from './repository';
import { Evento } from '../models/evento';

export class EventoRepository extends Repository {

    constructor() {
        super(Evento);
    }

    async obterPorCategoria(categoriaId) {
        let result = this.dao.obterTodos();
  
        result = result.filter(r => r.categoriaId == categoriaId);
  
        return result;
     }
}