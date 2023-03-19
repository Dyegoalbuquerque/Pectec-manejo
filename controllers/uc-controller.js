
import { plainToClass } from "class-transformer";
import { UCService } from '../services/uc-service';
import { BaseController } from './base-controller';
import { CicloCreche } from '../models/cicloCreche';

export class UCController extends BaseController {

   constructor(container) {
      super();
      this.ucService = container.get(UCService);
   }

   obterCiclosCrecheAtivo = async (req, res) => {
      try {
         let data = await this.ucService.obterCiclosCrecheAtivo();

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

   salvarCicloCreche = async (req, res) => {

      try {
         let ciclo = plainToClass(CicloCreche, req.body);
         let data = await this.ucService.salvarCicloCreche(ciclo);
         return res.status(201).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }
}
