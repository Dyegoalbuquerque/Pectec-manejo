import { Repository } from './repository';
import { Situacao } from '../models/situacao';

export class SituacaoRepository extends Repository {

    constructor() {
        super(Situacao);
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