
import { UTService } from '../services/ut-service';
import { BaseController } from './base-controller';

export class UTController extends BaseController {

   constructor(container) {
      super();
      this.utService = container.get(UTService);
   }

   obterCiclosTerminacaoAtivo = async (req, res) => {
      try {
         let data = await this.utService.obterCiclosTerminacaoAtivo();

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }
}
