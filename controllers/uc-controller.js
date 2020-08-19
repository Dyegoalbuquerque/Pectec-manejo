
import { UCService } from '../services/uc-service';
import { BaseController } from './base-controller';

export class UCController extends BaseController {

   constructor(container) {
      super();
      this.ucService = container.get(UCService);
   }

   obterCiclosCrescimentoAtivo = async (req, res) => {
      try {
         let data = await this.ucService.obterCiclosCrescimentoAtivo();

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterRelatorioUC = async (req, res) => {

      try {
         let dataInicial = req.query.dataInicial;
         let dataFinal = req.query.dataFinal;
         let data = await this.ucService.obterRelatorioUC(dataInicial, dataFinal);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }
}
