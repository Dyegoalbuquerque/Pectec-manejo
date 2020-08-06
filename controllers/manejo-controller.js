
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

   obterAnimalPorTag = async (req, res) => {
      try {
         let tags = req.query.tags.replace(':', '');
         let data = await this.manejoService.obterAnimalPorTag(tags);

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
         let tipoPrograma = req.query.tipoPrograma;
         let data = await this.manejoService.obterPrograma(tipoPrograma);

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

   obterCiclosReproducaoAtivoPorAnimal = async (req, res) => {
      try {
         let id = req.params.id.replace(':', '');
         let data = await this.manejoService.obterCiclosReproducaoAtivoPorAnimal(id);

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

   obterProgramaItensPorTag = async (req, res) => {
      try {
         let situacaoId = req.query.situacaoId;
         let data = await this.manejoService.obterProgramaItensPorTag(parseFloat(situacaoId));

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

   obterTagsQuantidades = async (req, res) => {

      try {

         let setor = req.query.setor;
         let data = await this.manejoService.obterTagsQuantidades(setor);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterTags = async (req, res) => {

      try {

         let setor = req.query.setor;
         let data = await this.manejoService.obterTags(setor);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterRelatorioUpl = async (req, res) => {

      try {
         let dataInicial = req.query.dataInicial;
         let dataFinal = req.query.dataFinal;
         let data = await this.manejoService.obterRelatorioUpl(dataInicial, dataFinal);
         return res.status(200).json(data);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }

   obterAcontecimentosPorSetor = async (req, res) => {
      try {
         let setor = req.query.setor;
         let data = req.query.data;
         let dados = await this.manejoService.obterAcontecimentosPorSetor(setor, data);
         return res.status(200).json(dados);

      } catch (e) {
         return this.tratarErro(e, res);
      }
   }
}
