
import { plainToClass } from "class-transformer";
import { UTService } from '../services/ut-service';
import { BaseController } from './base-controller';
import { CicloTerminacao } from '../models/cicloTerminacao';

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

   salvarCicloTerminacao = async (req, res) => {

      try {
         let ciclo = plainToClass(CicloTerminacao, req.body);
         let data = await this.utService.salvarCicloTerminacao(ciclo);
         return res.status(201).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }
}
