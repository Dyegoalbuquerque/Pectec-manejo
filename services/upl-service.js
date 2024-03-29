import { AnimalRepository } from '../repositorys/animal-repository';
import { CicloReproducaoRepository } from '../repositorys/cicloReproducao-repository';
import { CicloCrecheRepository } from '../repositorys/cicloCreche-repository';
import { TagRepository } from '../repositorys/tag-repository';
import { EspecieRepository } from '../repositorys/especie-repository';
import { ProgramaRepository } from '../repositorys/programa-repository';
import { ProgramaItemRepository } from '../repositorys/programaItem-repository';
import { SubcategoriaRepository } from '../repositorys/subCategoria-repository';
import { CausaObitoRepository } from '../repositorys/causaObito-repository';
import { LocalRepository } from '../repositorys/local-repository';
import { UplDto } from '../dtos/uplDto';
import { IndiceCicloReproducao } from './upl/indiceCicloReproducao';
import { IndiceAnimal } from './geral/indiceAnimal';
import { CicloCreche } from '../models/cicloCreche';

export class UplService {

   constructor(container) {
      this.animalRepository = container.get(AnimalRepository);
      this.cicloReproducaoRepository = container.get(CicloReproducaoRepository);
      this.cicloCrecheRepository = container.get(CicloCrecheRepository);
      this.programaRepository = container.get(ProgramaRepository);
      this.programaItemRepository = container.get(ProgramaItemRepository);
      this.tagRepository = container.get(TagRepository);
      this.especieRepository = container.get(EspecieRepository);
      this.subcategoriaRepository = container.get(SubcategoriaRepository);
      this.causaObitoRepository = container.get(CausaObitoRepository);
      this.localRepository = container.get(LocalRepository);
      this.uplDto = container.get(UplDto);
   }

   obterCiclosReproducaoPorAno = async (ano) => {
      let femeas = await this.animalRepository.obterFemeasAtivas();

      for (let i = 0; i < femeas.length; i++) {
         let item = femeas[i];
         item.ciclos = await this.cicloReproducaoRepository.obterAtivoPorFemea(item.id);
      }

      return this.uplDto.montarAnimais(femeas);
   }

   obterCiclosReproducaoAtivoPorAnimal = async (id) => {
      let ciclos = await this.cicloReproducaoRepository.obterAtivoPorFemea(id);

      return this.uplDto.montarCiclosReproducao(ciclos);
   }

   salvarCicloReproducao = async (item) => {

      if (!item.id) {

         let ciclos = await this.cicloReproducaoRepository.obterPorFemea(item.femeaId);

         for (let i = 0; i < ciclos.length; i++) {
            let ciclo = ciclos[i];
            ciclo.ativo = false;
            await this.cicloReproducaoRepository.atualizar(ciclo);
         }

         let animal = await this.animalRepository.obterPorId(item.femeaId);
         let especie = await this.especieRepository.obterPorId(animal.especieId);

         item.programarCiclo(especie);

         let id = await this.cicloReproducaoRepository.salvar(item);

         return id;
      }
   }

   atualizarCicloReproducao = async (item) => {

      let ciclo = await this.cicloReproducaoRepository.obterPorId(item.id);

      if (item.alterouDataFecundacao(ciclo)) {

         let ciclosConsultados = await this.cicloReproducaoRepository.obterPorFemea(item.femeaId);

         for (let i = 0; i < ciclosConsultados.length; i++) {
            let ciclo = ciclosConsultados[i];
            ciclo.ativo = false;
            await this.cicloReproducaoRepository.atualizar(ciclo);
         }
      }

      let mae = await this.animalRepository.obterPorId(item.femeaId);

      if (item.alterouEstado(ciclo)) {
         let especie = await this.especieRepository.obterPorId(mae.especieId);

         item.programarCiclo(especie);
      }

      let result = await this.cicloReproducaoRepository.atualizar(item);

      if (item.alterouDataDesmame(ciclo) && item.existeDesmamados()) {
         await this.salvarCicloCreche(item);
      }

      return result;
   }

   obterAnimalPorId = async (id) => {
      let result = await this.animalRepository.obterPorId(id);

      return this.uplDto.montarAnimal(result);
   }

   obterAnimalPorTag = async (situacoes) => {

      let result = await this.animalRepository.obterPorTag(situacoes);

      return this.uplDto.montarAnimais(result);
   }

   obterReprodutores = async () => {
      let result = await this.animalRepository.obterPorSexoTag("M", "RP");

      return this.uplDto.montarAnimais(result);
   }

   obterCausaObitos = async () => {
      let result = await this.causaObitoRepository.obterTodos();

      return this.uplDto.montarCausasObitos(result);
   }

   obterPrograma = async (tipoPrograma) => {
      let programa = await this.programaRepository.obterPorTipo(tipoPrograma);

      if (programa.id) {
         programa.itens = await this.programaItemRepository.obterPorPrograma(programa.id);

         for (let i = 0; i < programa.itens.length; i++) {
            let item = programa.itens[i];
            item.objetivo = await this.subcategoriaRepository.obterPorId(item.objetivoId);
         }
      }

      return this.uplDto.montarPrograma(programa);
   }

   obterAnimalPorNumero = async (numero) => {
      let result = await this.animalRepository.obterPorNumero(numero);

      return this.uplDto.montarAnimal(result);
   }

   obterFichaAnimal = async (id) => {
      let animal = await this.animalRepository.obterPorId(id);

      animal.ciclos = await this.cicloReproducaoRepository.obterPorFemea(id);

      return this.uplDto.montarFichaAnimal(animal);
   }

   salvarAnimal = async (item) => {
      item.numero = await this.animalRepository.max() + 1;

      let result = await this.animalRepository.salvar(item);

      return result;
   }

   atualizarAnimal = async (item) => {
      let id;

      let femea = await this.animalRepository.obterPorId(item.id);

      if (femea.dataObito != item.dataObito) {

         let acompanhamentos = await this.cicloReproducaoRepository.obterPorFemea(item.id);

         for (let i = 0; i < acompanhamentos.length; i++) {
            let acompanhamento = acompanhamentos[i];
            acompanhamento.ativo = false;
            await this.cicloReproducaoRepository.atualizar(acompanhamento);
         }
      }

      id = await this.animalRepository.atualizar(item);

      return id;
   }

   removerAnimal = async (item) => {
      let result = await this.animalRepository.remover(item);

      return result;
   }

   removerProgramaItem = async (id) => {
      await this.programaItemRepository.remover(id);

      return id;
   }

   obterProgramaItensPorTag = async (tagId) => {

      let itens = await this.programaItemRepository.obterPorTag(tagId);

      for (let i = 0; i < itens.length; i++) {
         let item = itens[i];
         item.objetivo = await this.subcategoriaRepository.obterPorId(item.objetivoId);
      }

      return this.uplDto.montarProgramasItens(itens);
   }

   salvarProgramaItem = async (item) => {
      item.ativo = true;

      let id = await this.programaItemRepository.salvar(item);
      item.id = id;

      return item;
   }

   atualizarProgramaItem = async (item) => {
      let id = await this.programaItemRepository.atualizar(item);
      item.id = id;

      return item;
   }

   salvarCicloCreche = async (cicloReproducao) => {

      if (cicloReproducao.dataDesmameReal) {console.log(cicloReproducao)
         let cicloCreche = new CicloCreche();
         cicloCreche.gerarCiclo(cicloReproducao);
         console.log(cicloCreche)
         await this.cicloCrecheRepository.salvar(cicloCreche);
      }
   }

   obterTagsQuantidades = async (setor) => {

      let tags = await this.tagRepository.obterPorSetor(setor);

      let animais = await this.animalRepository.obterTodos();

      return this.uplDto.montarTagsQuantidade(tags, animais);
   }

   obterTags = async (setor) => {
      let tags = await this.tagRepository.obterPorSetor(setor);

      return this.uplDto.montarTags(tags);
   }

   obterRelatorioUpl = async (dataInicial, dataFinal) => {

      let femeasAtivas = await this.animalRepository.obterFemeasAtivas();
      let todosCiclos = await this.cicloReproducaoRepository.obterPorIntervalo(dataInicial, dataFinal);
      let reprodutores = await this.obterReprodutores();

      let quantidadeTotalMatriz = femeasAtivas.length;
      let quantidadeTotalReprodutor = reprodutores.length;
      let quantidadeTotalMarra = IndiceAnimal.obterQuantidadeMarra(femeasAtivas);
      let quantidadeTotalGestacao = IndiceAnimal.obterQuantidadeGestacao(femeasAtivas);
      let quantidadeTotalLactacao = IndiceAnimal.obterQuantidadeLactacao(femeasAtivas);
      let quantidadeTotalConfirmacaoGestacao = IndiceAnimal.obterQuantidadeConfirmacaoGestacao(femeasAtivas);
      let quantidadeTotalIDC = IndiceAnimal.obterQuantidadeIDC(femeasAtivas);

      let quantidadeCiclosNascidos = IndiceCicloReproducao.obterQuantidadeCiclosNascidos(todosCiclos);
      let quantidadeCiclosDesmamados = IndiceCicloReproducao.obterQuantidadeCiclosDesmamados(todosCiclos);
      let quantidadeTotalLeitaoVivo = IndiceCicloReproducao.obterQuantidadeVivos(todosCiclos);
      let nlnMedioGeral = IndiceCicloReproducao.obterNLN(todosCiclos, quantidadeCiclosNascidos);
      let nldMedioGeral = IndiceCicloReproducao.obterNLD(todosCiclos, quantidadeCiclosDesmamados);
      let plnMedioGeral = IndiceCicloReproducao.obterPLN(todosCiclos, quantidadeCiclosNascidos);
      let pldMedioGeral= IndiceCicloReproducao.obterPLD(todosCiclos, quantidadeCiclosDesmamados);
      let taxaMortalidade = IndiceCicloReproducao.obterTaxaMortalidade(todosCiclos);
      let taxaRetornoCio = IndiceCicloReproducao.obterTaxaRetornoCio(todosCiclos);
      let taxaAborto = IndiceCicloReproducao.obterTaxaAborto(todosCiclos);
      let taxaParicao = IndiceCicloReproducao.obterTaxaParicao(todosCiclos);
      let pmlnMedioGeral = 0;
      let pmldMedioGeral = 0;

      let resumoRelatorio = {
         quantidadeTotalLeitaoVivo, nlnMedioGeral, nldMedioGeral,
         plnMedioGeral, pmlnMedioGeral, pldMedioGeral,
         pmldMedioGeral, quantidadeTotalIDC, taxaMortalidade,
         quantidadeTotalMatriz, quantidadeTotalReprodutor, quantidadeTotalMarra,
         quantidadeTotalGestacao, quantidadeTotalLactacao, quantidadeTotalConfirmacaoGestacao,
         taxaRetornoCio, taxaAborto, taxaParicao
      };

      return this.uplDto.montarRelatorioUpl(resumoRelatorio, dataInicial, dataFinal);
   }

   obterRelatorioMatrizes = async (dataInicial, dataFinal) => {

      let matrizes = await this.animalRepository.obterFemeasAtivas();
      let todosCiclos = await this.cicloReproducaoRepository.obterPorIntervalo(dataInicial, dataFinal);

      let itens = [];

      for (let i = 0; i < matrizes.length; i++) {
         let matriz = matrizes[i];
         let ciclosDoAnimal = IndiceCicloReproducao.obterCiclosPorMatriz(todosCiclos, matriz.id);
         let quantidadeCiclosNascidos = IndiceCicloReproducao.obterQuantidadeCiclosNascidos(ciclosDoAnimal);
         let quantidadeCiclosDesmamados = IndiceCicloReproducao.obterQuantidadeCiclosDesmamados(ciclosDoAnimal);

         let item = {
            numero: matriz.numero,
            nln: IndiceCicloReproducao.obterNLN(ciclosDoAnimal, quantidadeCiclosNascidos),
            nld: IndiceCicloReproducao.obterNLD(ciclosDoAnimal, quantidadeCiclosDesmamados),
            pln: IndiceCicloReproducao.obterPLN(ciclosDoAnimal, quantidadeCiclosNascidos),
            pld: IndiceCicloReproducao.obterPLD(ciclosDoAnimal, quantidadeCiclosDesmamados),
            taxaMortalidade: IndiceCicloReproducao.obterTaxaMortalidade(ciclosDoAnimal),
            taxaRetornoCio: IndiceCicloReproducao.obterTaxaRetornoCio(ciclosDoAnimal),
            taxaParicao: IndiceCicloReproducao.obterTaxaParicao(ciclosDoAnimal),
            taxaAborto: IndiceCicloReproducao.obterTaxaAborto(ciclosDoAnimal),
            quantidadeCiclos: IndiceCicloReproducao.obterQuantidadeCiclosPorMatriz(todosCiclos, matriz.id)
         }
         itens.push(item);
      }

      return this.uplDto.montarRelatorioMatrizes(itens, dataInicial, dataFinal);
   }
     
   obterLocais = async () => {
      let locais = await this.localRepository.obterTodos();

      return locais;
   }
}