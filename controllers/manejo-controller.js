
import { plainToClass } from "class-transformer";
import { UplService } from '../services/upl-service';
import { BaseController } from './base-controller';
import { Animal } from '../models/animal';
import { CicloReproducao } from '../models/cicloReproducao';
import { ProgramaItem } from "../models/programaItem";

export class ManejoController extends BaseController {

   constructor(container) {
      super();
      this.uplService = container.get(UplService);
   }

   simularCiclo = async (req, res) => {

      try {
         let data = await this.uplService.simularCiclo(req.body);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterAnimalPorId = async (req, res) => {
      try {
         let id = req.params.id.replace(':', '');
         let data = await this.uplService.obterAnimalPorId(id);

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterAnimalPorTag = async (req, res) => {
      try {
         let tags = req.query.tags.replace(':', '');
         let data = await this.uplService.obterAnimalPorTag(tags);

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterReprodutores = async (req, res) => {
      try {
         let data = await this.uplService.obterReprodutores();

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterCausaObitos = async (req, res) => {
      try {
         let data = await this.uplService.obterCausaObitos();

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterPrograma = async (req, res) => {
      try {
         let tipoPrograma = req.query.tipoPrograma;
         let data = await this.uplService.obterPrograma(tipoPrograma);

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
         let data = await this.uplService.obterFichaAnimal(id);

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterCiclosReproducaoPorAno = async (req, res) => {
      try {
         let ano = req.query.ano;
         let data = await this.uplService.obterCiclosRepdorucaoPorAno(ano);

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterCiclosReproducaoAtivoPorAnimal = async (req, res) => {
      try {
         let id = req.params.id.replace(':', '');
         let data = await this.uplService.obterCiclosReproducaoAtivoPorAnimal(id);

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   salvarAnimal = async (req, res) => {

      try {
         let animal = plainToClass(Animal, req.body);
         let data = await this.uplService.salvarAnimal(animal);
         return res.status(201).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   atualizarAnimal = async (req, res) => {

      try {
         let animal = plainToClass(Animal, req.body);
         let data = await this.uplService.atualizarAnimal(animal);

         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   removerAnimal = async (req, res) => {

      try {

         let id = req.params.id.replace(':', '');
         let data = await this.uplService.removerAnimal(id);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   removerProgramaItem = async (req, res) => {

      try {

         let id = req.params.id.replace(':', '');
         let data = await this.uplService.removerProgramaItem(id);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   salvarCicloReproducao = async (req, res) => {

      try {
         let ciclo = plainToClass(CicloReproducao, req.body);
         let data = await this.uplService.salvarCicloReproducao(ciclo);
         return res.status(201).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   atualizarCicloReproducao = async (req, res) => {

      try {
         let ciclo = plainToClass(CicloReproducao, req.body);
         let data = await this.uplService.atualizarCicloReproducao(ciclo);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterProgramaItensPorTag = async (req, res) => {
      try {
         let tagId = req.query.tagId;
         let data = await this.uplService.obterProgramaItensPorTag(parseFloat(tagId));

         return res.status(200).json(data);
      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   salvarProgramaItem = async (req, res) => {

      try {
         let programa = plainToClass(Programa, req.body);
         let data = await this.uplService.salvarProgramaItem(programa);
         return res.status(201).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   atualizarProgramaItem = async (req, res) => {

      try {

         let programa = plainToClass(ProgramaItem, req.body);
         let data = await this.uplService.atualizarProgramaItem(programa);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterTagsQuantidades = async (req, res) => {

      try {

         let setor = req.query.setor;
         let data = await this.uplService.obterTagsQuantidades(setor);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterTags = async (req, res) => {

      try {

         let setor = req.query.setor;
         let data = await this.uplService.obterTags(setor);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterRelatorioUpl = async (req, res) => {

      try {
         let dataInicial = req.query.dataInicial;
         let dataFinal = req.query.dataFinal;
         let data = await this.uplService.obterRelatorioUpl(dataInicial, dataFinal);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterAcontecimentosPorSetor = async (req, res) => {
      try {
         let setor = req.query.setor;
         let dataInicio = req.query.dataInicio;
         let dataFinal = req.query.dataFinal;
         let dados = await this.uplService.obterAcontecimentosPorSetor(setor, dataInicio, dataFinal);
         return res.status(200).json(dados);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }
}
