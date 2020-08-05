import { Repository } from './repository';
import { Tag } from '../models/tag';

export class TagRepository extends Repository {

    constructor() {
        super(Tag);
    }

    async obterPorSetor(setor) {
        let result = this.dao.obterTodos();
        
  
        result = result.filter(r => r.setores.includes(setor));
  
        return result;
     }

     async obterPorTipo(tipo) {
        let result = this.dao.obterTodos();
        
  
        result = result.filter(r => r.tipo == tipo);
  
        return result;
     }
}