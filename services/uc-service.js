import { CicloCrescimentoRepository } from '../repositorys/cicloCrescimento-repository';
import { IndiceCicloCrescimento } from './uc/indiceCicloCrescimento';
import { UCDto } from '../dtos/ucDto';

export class UCService {

   constructor(container) {
      this.cicloCrescimentoRepository = container.get(CicloCrescimentoRepository);
      this.ucDto = container.get(UCDto);
   }

   obterCiclosCrescimentoAtivo = async () => {
      let ciclos = await this.cicloCrescimentoRepository.obterAtivos();

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