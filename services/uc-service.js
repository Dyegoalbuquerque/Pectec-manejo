import { CicloCrescimentoRepository } from '../repositorys/cicloCrescimento-repository';
import { LocalRepository } from '../repositorys/local-repository';
import { IndiceCicloCrescimento } from './uc/indiceCicloCrescimento';
import { UCDto } from '../dtos/ucDto';

export class UCService {

   constructor(container) {
      this.cicloCrescimentoRepository = container.get(CicloCrescimentoRepository);
      this.localRepository = container.get(LocalRepository);
      this.ucDto = container.get(UCDto);
   }

   obterCiclosCrescimentoAtivo = async () => {
      let ciclos = await this.cicloCrescimentoRepository.obterAtivos();
      let locais = await this.localRepository.obterTodos();

      for(let i=0; i < ciclos.length; i++){
         let ciclo = ciclos[i];
         ciclo.local = locais.filter(l => l.id == ciclo.localId)[0];
      }

      return this.ucDto.montarCiclosCrescimento(ciclos);
   }

   obterRelatorioUC = async (dataInicial, dataFinal) => {

      let todosCiclos = await this.cicloCrescimentoRepository.obterPorIntervalo(dataInicial, dataFinal);

      let quantidadeAnimais = IndiceCicloCrescimento.obterQuantidadeAnimaisNaUC(todosCiclos);
      let taxaMortalidade = IndiceCicloCrescimento.obterTaxaMortalidade(todosCiclos);

      let resumoRelatorio = {
         quantidadeAnimais, taxaMortalidade
      };

      return this.ucDto.montarRelatorioUC(resumoRelatorio, dataInicial, dataFinal);
   }
}