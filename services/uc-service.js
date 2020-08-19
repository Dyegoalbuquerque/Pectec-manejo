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

     console.log(IndiceCicloCrescimento.obterQuantidadeLeitoesNaUC(ciclos));

      return this.ucDto.montarCiclosCrescimento(ciclos);
   }
}