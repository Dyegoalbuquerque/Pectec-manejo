import { AnimalRepository } from '../repositorys/animal-repository';
import { CicloReproducaoRepository } from '../repositorys/cicloReproducao-repository';
import { SituacaoRepository } from '../repositorys/situacao-repository';
import { EspecieRepository } from '../repositorys/especie-repository';
import { ProgramaRepository } from '../repositorys/programa-repository';
import { ProgramaItemRepository } from '../repositorys/programaItem-repository';
import { SubcategoriaRepository } from '../repositorys/subCategoria-repository';
import { CausaObitoRepository } from '../repositorys/causaObito-repository';
import { LoteRepository } from '../repositorys/lote-repository';
import { ManejoDto } from '../dtos/manejoDto';

export class ManejoService {

   constructor(container) {
      this.animalRepository = container.get(AnimalRepository);
      this.acompanhamentoRepository = container.get(CicloReproducaoRepository);
      this.programaRepository = container.get(ProgramaRepository);
      this.programaItemRepository = container.get(ProgramaItemRepository);
      this.situacaoRepository = container.get(SituacaoRepository);
      this.especieRepository = container.get(EspecieRepository);
      this.subcategoriaRepository = container.get(SubcategoriaRepository);
      this.causaObitoRepository = container.get(CausaObitoRepository);
      this.manejoDto = container.get(ManejoDto);
      this.loteRepository = container.get(LoteRepository);
   }

   obterCiclosRepdorucaoPorAno = async (ano) => {
      let femeas = await this.animalRepository.obterPorSexo("F");

      for (let i = 0; i < femeas.length; i++) {
         let item = femeas[i];
         item.acompanhamentos = await this.acompanhamentoRepository.obterPorFemea(item.id);
      }

      return femeas;
   }

   obterCicloReproducaoPorAnimal = async (id) => {
      let acompanhamentos = await this.acompanhamentoRepository.obterPorFemea(id);

      return acompanhamentos;
   }

   salvarCicloReproducao = async (item) => {

      if (!item.id) {

         let acompanhamentos = await this.acompanhamentoRepository.obterPorFemea(item.femeaId);

         for (let i = 0; i < acompanhamentos.length; i++) {
            let acompanhamento = acompanhamentos[i];
            acompanhamento.ativo = false;
            await this.acompanhamentoRepository.atualizar(acompanhamento);
         }

         let animal = await this.animalRepository.obterPorId(item.femeaId);
         let especie = await this.especieRepository.obterPorId(animal.especieId);

         item.programarCiclo(especie);

         let id = await this.acompanhamentoRepository.salvar(item);

         return id;
      }
   }

   atualizarCicloReproducao = async (item) => {

      let acompanhamento = await this.acompanhamentoRepository.obterPorId(item.id);

      if (item.alterouDataFecundacao(acompanhamento)) {

         let acompanhamentos = await this.acompanhamentoRepository.obterPorFemea(item.femeaId);

         for (let i = 0; i < acompanhamentos.length; i++) {
            let acompanhamento = acompanhamentos[i];
            acompanhamento.ativo = false;
            await this.acompanhamentoRepository.atualizar(acompanhamento);
         }
      }

      let mae = await this.animalRepository.obterPorId(item.femeaId);

      if (item.alterouEstado(acompanhamento)) {
         let especie = await this.especieRepository.obterPorId(mae.especieId);

         item.programarCiclo(especie);
      }

      let result = await this.acompanhamentoRepository.atualizar(item);

      return result;
   }

   obterLotesVenda = async (tipo) => {
         let result = await this.loteRepository.obterLotesDisponiveis(tipo);
   
         return this.manejoDto.montarLoteVenda(result);
   }

   obterAnimalPorId = async (id) => {
      let result = await this.animalRepository.obterPorId(id);

      return result;
   }

   obterAnimalPorSituacao = async (situacoes)=> {;
      let result = await this.animalRepository.obterPorSituacao(situacoes);

      return result;
   }

   obterReprodutores = async ()=>  {
      let result = await this.animalRepository.obterPorSexoSituacao("M", "RP");

      return result;
   }

   obterCausaObitos = async () => {
      let result = await this.causaObitoRepository.obterTodos();

      return result;
   }

   obterPrograma =  async (tipoProgramaId)=>  {
      let programa = await this.programaRepository.obterPorTipo(tipoProgramaId);

      if (programa.id) {
         programa.itens = await this.programaItemRepository.obterPorPrograma(programa.id);

         for (let i = 0; i < programa.itens.length; i++) {
            let item = programa.itens[i];
            item.objetivo = await this.subcategoriaRepository.obterPorId(item.objetivoId);
         }
      }

      return programa;
   }

   obterAnimalPorNumero = async (numero) => {
      let result = await this.animalRepository.obterPorNumero(numero);

      return result;
   }

   obterFichaAnimal = async (id) => {
      let result = await this.animalRepository.obterPorId(id);

      return result;
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

         let acompanhamentos = await this.acompanhamentoRepository.obterPorFemea(item.id);

         for (let i = 0; i < acompanhamentos.length; i++) {
            let acompanhamento = acompanhamentos[i];
            acompanhamento.ativo = false;
            await this.acompanhamentoRepository.atualizar(acompanhamento);
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

   obterProgramaItensPorSituacao = async (situacaoId) => {

      let itens = await this.programaItemRepository.obterPorSituacao(situacaoId);

      for (let i = 0; i < itens.length; i++) {
         let item = itens[i];
         item.objetivo = await this.subcategoriaRepository.obterPorId(item.objetivoId);
      }

      return itens;
   }

   salvarProgramaItem = async (item) =>  {

      let id = await this.programaItemRepository.salvar(item);
      item.id = id;

      return item;
   }

   atualizarProgramaItem = async (item) => {
      let id = await this.programaItemRepository.atualizar(item);
      item.id = id;

      return item;
   }

   obterSituacoesQuantidades = async (setor) =>  {

      let situacoes = await this.situacaoRepository.obterPorSetor(setor);

      let animais = await this.animalRepository.obterTodos();

      let itens = [];

      for (let i = 0; i < situacoes.length; i++) {
         let situacao = situacoes[i];
         let quantidade = animais.filter(a => a.situacao == situacao.sigla).length;

         let item = {
            id: situacao.id,
            nome: situacao.nome,
            quantidade: quantidade,
            sigla: situacao.sigla,
            descricao: situacao.descricao
         }

         itens.push(item);
      }

      return itens;
   }

   obterSituacoes = async (setor) => {
      let situacoes = await this.situacaoRepository.obterPorSetor(setor);

      return situacoes;
   }
}
