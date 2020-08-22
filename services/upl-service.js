import { AnimalRepository } from '../repositorys/animal-repository';
import { CicloReproducaoRepository } from '../repositorys/cicloReproducao-repository';
import { CicloCrescimentoRepository } from '../repositorys/cicloCrescimento-repository';
import { TagRepository } from '../repositorys/tag-repository';
import { EspecieRepository } from '../repositorys/especie-repository';
import { ProgramaRepository } from '../repositorys/programa-repository';
import { ProgramaItemRepository } from '../repositorys/programaItem-repository';
import { SubcategoriaRepository } from '../repositorys/subCategoria-repository';
import { CausaObitoRepository } from '../repositorys/causaObito-repository';
import { AcontecimentoRepository } from '../repositorys/acontecimento-repository';
import { AcontecimentoItemRepository } from '../repositorys/acontecimentoItem-repository';
import { UplDto } from '../dtos/uplDto';
import { IndiceCicloReproducao } from './upl/indiceCicloReproducao';
import { IndiceAnimal } from './geral/indiceAnimal';
import { CicloCrescimento } from '../models/cicloCrescimento';

export class UplService {

   constructor(container) {
      this.animalRepository = container.get(AnimalRepository);
      this.cicloReproducaoRepository = container.get(CicloReproducaoRepository);
      this.cicloCrescimentoRepository = container.get(CicloCrescimentoRepository);
      this.programaRepository = container.get(ProgramaRepository);
      this.programaItemRepository = container.get(ProgramaItemRepository);
      this.tagRepository = container.get(TagRepository);
      this.especieRepository = container.get(EspecieRepository);
      this.subcategoriaRepository = container.get(SubcategoriaRepository);
      this.causaObitoRepository = container.get(CausaObitoRepository);
      this.acontecimentoRepository = container.get(AcontecimentoRepository);
      this.acontecimentoItemRepository = container.get(AcontecimentoItemRepository);
      this.uplDto = container.get(UplDto);
   }

   obterCiclosReproducaoPorAno = async (ano) => {
      let femeas = await this.animalRepository.obterFemeasAtivas();

      for (let i = 0; i < femeas.length; i++) {
         let item = femeas[i];
         item.acompanhamentos = await this.cicloReproducaoRepository.obterAtivoPorFemea(item.id);
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
         await this.salvarCicloCrescimento(item);
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
      let result = await this.animalRepository.obterPorId(id);

      return this.uplDto.montarAnimal(result);
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

   salvarCicloCrescimento = async (cicloReproducao) => {

      if (cicloReproducao.dataDesmameReal) {
         let cicloCrescimento = new CicloCrescimento();
         cicloCrescimento.gerarCiclo(cicloReproducao);

         await this.cicloCrescimentoRepository.salvar(cicloCrescimento);
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
      let quantidadeTotalLeitaoVivo = IndiceCicloReproducao.obterQuantidadeLeitoesVivos(todosCiclos);
      let nlnMedioGeral = IndiceCicloReproducao.obterNLN(todosCiclos, quantidadeCiclosNascidos);
      let nldMedioGeral = IndiceCicloReproducao.obterNLD(todosCiclos, quantidadeCiclosDesmamados);
      let pmlnMedioGeral = IndiceCicloReproducao.obterPMLN(todosCiclos, quantidadeCiclosNascidos);
      let pmldMedioGeral = IndiceCicloReproducao.obterPMLD(todosCiclos, quantidadeCiclosDesmamados);
      let taxaMortalidade = IndiceCicloReproducao.obterTaxaMortalidade(todosCiclos);
      let taxaRetornoCio = IndiceCicloReproducao.obterTaxaRetornoCio(todosCiclos);
      let taxaAborto = IndiceCicloReproducao.obterTaxaAborto(todosCiclos);
      let taxaParicao = IndiceCicloReproducao.obterTaxaParicao(todosCiclos);
      let plnMedioGeral = 0;
      let pldMedioGeral = 0;

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
         let ciclosDoAnimal = IndiceCicloReproducao.obterCiclosPorMatriz(todosCiclos, matriz.numero);
         let quantidadeCiclosNascidos = IndiceCicloReproducao.obterQuantidadeCiclosNascidos(ciclosDoAnimal);
         let quantidadeCiclosDesmamados = IndiceCicloReproducao.obterQuantidadeCiclosDesmamados(ciclosDoAnimal);

         let item = {
            numero: matriz.numero,
            nln: IndiceCicloReproducao.obterNLN(ciclosDoAnimal, quantidadeCiclosNascidos),
            nld: IndiceCicloReproducao.obterNLD(ciclosDoAnimal, quantidadeCiclosDesmamados),
            pmln: IndiceCicloReproducao.obterPMLN(ciclosDoAnimal, quantidadeCiclosNascidos),
            pmld: IndiceCicloReproducao.obterPMLD(ciclosDoAnimal, quantidadeCiclosDesmamados),
            taxaMortalidade: IndiceCicloReproducao.obterTaxaMortalidade(ciclosDoAnimal),
            taxaRetornoCio: IndiceCicloReproducao.obterTaxaRetornoCio(ciclosDoAnimal),
            taxaParicao: IndiceCicloReproducao.obterTaxaParicao(ciclosDoAnimal),
            taxaAborto: IndiceCicloReproducao.obterTaxaParicao(ciclosDoAnimal),
            quantidadeCiclos: IndiceCicloReproducao.obterQuantidadeCiclosPorMatriz(todosCiclos, matriz.numero)
         }
         itens.push(item);
      }

      return this.uplDto.montarRelatorioMatrizes(itens, dataInicial, dataFinal);
   }

   obterAcontecimentosPorSetor = async (setor, dataInicio, dataFinal) => {

      let existeAcontecimentos = await this.acontecimentoRepository.verificarSeExiste(setor, dataInicio, dataFinal);

      if (existeAcontecimentos) {
         let acotecimentosDoIntervalo = await this.acontecimentoRepository.obterPorIntervalo(setor, dataInicio, dataFinal);
         let itens = [];

         for (let i = 0; i < acotecimentosDoIntervalo.length; i++) {
            let acontecimento = acotecimentosDoIntervalo[i];
            let itensConsultados = await this.acontecimentoItemRepository.obterPorAcontecimento(acontecimento.id);
            itens = itens.concat(itensConsultados);
         }
         return itens;

      } else {

         let programas = await this.programaRepository.obterPorSetor(setor);
         let programaIds = programas.map(i => i.id);
         let programaItensAtivos = await this.programaItemRepository.obterAtivosPorProgramaIds(programaIds);
      }
      /*
      let tags = await this.tagRepository.obterPorSetor(setor);
      let tagIds = tags.map(i => i.id);
      let programaItens = await this.programaItemRepository.obterPorTagIds(tagIds);
      */

      return [];
   }
}