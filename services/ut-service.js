import { CicloTermicacaoRepository } from '../repositorys/cicloTerminacao-repository';
import { LocalRepository } from '../repositorys/local-repository';
import { UTDto } from '../dtos/utDto';

export class UTService {

   constructor(container) {
      this.cicloTerminacaoRepository = container.get(CicloTermicacaoRepository);
      this.localRepository = container.get(LocalRepository);
      this.utDto = container.get(UTDto);
   }

   obterCiclosTerminacaoAtivo = async () => {
      let ciclos = await this.cicloTerminacaoRepository.obterAtivos();
      let locais = await this.localRepository.obterTodos();

      for(let i=0; i < ciclos.length; i++){
         let ciclo = ciclos[i];
         ciclo.local = locais.filter(l => l.id == ciclo.localId)[0];
      }

      return this.utDto.montarCiclosTerminacao(ciclos);
   }
}