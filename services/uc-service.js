import { CicloCrecheRepository } from '../repositorys/cicloCreche-repository';
import { LocalRepository } from '../repositorys/local-repository';
import { IndiceCicloCreche } from './uc/indiceCicloCreche';
import { UCDto } from '../dtos/ucDto';

export class UCService {

   constructor(container) {
      this.cicloCrecheRepository = container.get(CicloCrecheRepository);
      this.localRepository = container.get(LocalRepository);
      this.ucDto = container.get(UCDto);
   }

   obterCiclosCrecheAtivo = async () => {
      let ciclos = await this.cicloCrecheRepository.obterAtivos();
      let locais = await this.localRepository.obterTodos();

      for(let i=0; i < ciclos.length; i++){
         let ciclo = ciclos[i];
         ciclo.local = locais.filter(l => l.id == ciclo.localId)[0];
      }

      return this.ucDto.montarCiclosCrescimento(ciclos);
   }

   obterRelatorioUC = async (dataInicial, dataFinal) => {

      let todosCiclos = await this.cicloCrecheRepository.obterPorIntervalo(dataInicial, dataFinal);

      let quantidadeAnimais = IndiceCicloCreche.obterQuantidadeAnimaisNaUC(todosCiclos);
      let taxaMortalidade = IndiceCicloCreche.obterTaxaMortalidade(todosCiclos);

      let resumoRelatorio = {
         quantidadeAnimais, taxaMortalidade
      };

      return this.ucDto.montarRelatorioUC(resumoRelatorio, dataInicial, dataFinal);
   }

   salvarCicloCreche = async (ciclo) => {      
      let dataEncerramento = new Date(ciclo.dataNascimento);
      let totalDiasEncerramento = dataEncerramento.getDate() + ciclo.tempoCiclo;
      dataEncerramento.setDate(totalDiasEncerramento); 

      ciclo.dataEncerramento = dataEncerramento.toJSON();
      ciclo.ativo = true;

      await this.cicloCrecheRepository.salvar(ciclo);

   }
}