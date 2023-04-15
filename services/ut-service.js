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

      for (let i = 0; i < ciclos.length; i++) {
         let ciclo = ciclos[i];
         ciclo.local = locais.filter(l => l.id == ciclo.localId)[0];
      }

      return this.utDto.montarCiclosTerminacao(ciclos);
   }

   salvarCicloTerminacao = async (ciclo) => {
      let dataEncerramento = new Date(ciclo.dataNascimento);
      let totalDiasEncerramento = dataEncerramento.getDate() + ciclo.tempoCiclo;
      dataEncerramento.setDate(totalDiasEncerramento); 

      ciclo.dataEncerramento = dataEncerramento.toJSON();
      ciclo.ativo = true;
      
      await this.cicloTerminacaoRepository.salvar(ciclo);

   }

   atualizarCicloTerminacao = async (item) => {

      let cicloTerminacao = await this.cicloTerminacaoRepository.obterPorId(item.id);

      if(cicloTerminacao){
         return await this.cicloTerminacaoRepository.atualizar(item.id, item);
      }

      return 0;
  }

}