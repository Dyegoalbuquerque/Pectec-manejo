
import { plainToClass } from "class-transformer";
import { ManejoService } from '../services/manejo-service';
import { BaseController } from './base-controller';
import { Animal } from '../models/animal';
import { CicloReproducao } from '../models/cicloReproducao';

export class ManejoController extends BaseController {

   constructor(container) {
      super();
      this.manejoService = container.get(ManejoService);
   }

   simularCiclo = async (req, res) => {

      try {
         let data = await this.manejoService.simularCiclo(req.body);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterAnimalPorId = async (req, res) => {
      try {
         let id = req.params.id.replace(':', '');
         let data = await this.manejoService.obterAnimalPorId(id);

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterAnimalPorSituacao = async (req, res) => {
      try {
         let situacoes = req.query.situacoes.replace(':', '');
         let data = await this.manejoService.obterAnimalPorSituacao(situacoes);

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterReprodutores = async (req, res) => {
      try {
         let data = await this.manejoService.obterReprodutores();

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterCausaObitos = async (req, res) => {
      try {
         let data = await this.manejoService.obterCausaObitos();

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterPrograma = async (req, res) => {
      try {
         let tipoProgramaId = req.query.tipoProgramaId;
         let data = await this.manejoService.obterPrograma(parseFloat(tipoProgramaId));

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterAnimalPorNumero = async (numero) => {
      let result = await this.animalRepository.obterPorNumero(numero);

      return result;
   }

   obterFichaAnimal = async (req, res) => {
      try {
         let id = req.params.id.replace(':', '');
         let data = await this.manejoService.obterFichaAnimal(id);

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterCiclosReproducaoPorAno = async (req, res) => {
      try {
         let ano = req.query.ano;
         let data = await this.manejoService.obterCiclosRepdorucaoPorAno(ano);

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterCiclosReproducaoPorAnimal = async (req, res) => {
      try {
         let id = req.params.id.replace(':', '');
         let data = await this.manejoService.obterCicloReproducaoPorAnimal(id);

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   salvarAnimal = async (req, res) => {

      try {
         let animal = plainToClass(Animal, req.body);
         let data = await this.manejoService.salvarAnimal(animal);
         return res.status(201).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   atualizarAnimal = async (req, res) => {

      try {
         let animal = plainToClass(Animal, req.body);
         let data = await this.manejoService.atualizarAnimal(animal);

         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   removerAnimal = async (req, res) => {

      try {

         let id = req.params.id.replace(':', '');
         let data = await this.manejoService.removerAnimal(id);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   removerProgramaItem = async (req, res) => {

      try {

         let id = req.params.id.replace(':', '');
         let data = await this.manejoService.removerProgramaItem(id);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   salvarCicloReproducao = async (req, res) => {

      try {
         let ciclo = plainToClass(CicloReproducao, req.body);
         let data = await this.manejoService.salvarCicloReproducao(ciclo);
         return res.status(201).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   atualizarCicloReproducao = async (req, res) => {

      try {
         let ciclo = plainToClass(CicloReproducao, req.body);
         let data = await this.manejoService.atualizarCicloReproducao(ciclo);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterProgramaItensPorSituacao = async (req, res) => {
      try {
         let situacaoId = req.query.situacaoId;
         let data = await this.manejoService.obterProgramaItensPorSituacao(parseFloat(situacaoId));

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   salvarProgramaItem = async (req, res) => {

      try {
         let programa = plainToClass(Programa, req.body);
         let data = await this.manejoService.salvarProgramaItem(programa);
         return res.status(201).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   atualizarProgramaItem = async (req, res) => {

      try {

         let programa = plainToClass(Programa, req.body);
         let data = await this.manejoService.atualizarProgramaItem(programa);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterSituacoesQuantidades = async (req, res) => {

      try {

         let setor = req.query.setor;
         let data = await this.manejoService.obterSituacoesQuantidades(setor);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterSituacoes = async (req, res) => {

      try {

         let setor = req.query.setor;
         let data = await this.manejoService.obterSituacoes(setor);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   atualizarSituacoes = async (req, res) => {

      try {
         let especieId = req.body;
         let data = await this.manejoService.atualizarSituacoes(especieId.especieId);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterRelatorioUpl = async (req, res) => {

      try {
         let data = await this.manejoService.obterRelatorioUpl();
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }
}
