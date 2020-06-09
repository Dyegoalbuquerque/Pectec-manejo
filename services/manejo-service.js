import { AnimalRepository } from '../repositorys/animal-repository';
import { AcompanhamentoRepository } from '../repositorys/acompanhamento-repository';
import { CicloRepository } from '../repositorys/ciclo-repository';
import { CicloFilhoRepository } from '../repositorys/ciclo-filho-repository';
import { SituacaoRepository } from '../repositorys/situacao-repository';
import { EspecieRepository } from '../repositorys/especie-repository';
import { Constantes } from '../constantes';
import { ProgramaRepository } from '../repositorys/programa-repository';
import { ProgramaItemRepository } from '../repositorys/programaItem-repository';
import { SubcategoriaRepository } from '../repositorys/subCategoria-repository';
import { CausaObitoRepository } from '../repositorys/causaObito-repository';
import { LoteRepository } from '../repositorys/lote-repository';
import { Animal } from '../models/animal';
import { ManejoFactory } from '../manejoFactory';
import { ManejoDto } from '../dtos/manejoDto';

export class ManejoService {

   constructor(container) {

      this.cicloRepository = container.get(CicloRepository);
      this.cicloFilhoRepository = container.get(CicloFilhoRepository);
      this.animalRepository = container.get(AnimalRepository);
      this.acompanhamentoRepository = container.get(AcompanhamentoRepository);
      this.programaRepository = container.get(ProgramaRepository);
      this.programaItemRepository = container.get(ProgramaItemRepository);
      this.situacaoRepository = container.get(SituacaoRepository);
      this.especieRepository = container.get(EspecieRepository);
      this.subcategoriaRepository = container.get(SubcategoriaRepository);
      this.causaObitoRepository = container.get(CausaObitoRepository);
      this.manejoDto = container.get(ManejoDto);
      this.loteRepository = container.get(LoteRepository);
   }


   montarCiclo = async (filho) => {

      let ciclo = new Ciclo();
      let dataIncio = new Date(filho.dataInicio);
      let now = new Date();
      now.setDate(dataIncio.getDate() + filho.quantidadeDias)

      let dataParaTipoDeCiclo = now;

      switch (filho.tipo) {
         case Constantes.TipoCicloGestacao():
            ciclo.dataCobertura = dataIncio;
            ciclo.dataParicao = dataParaTipoDeCiclo;
            break;
         case Constantes.TipoCicloLactacao():
            ciclo.dataApartar = dataParaTipoDeCiclo;
            break;
         case Constantes.TipoCicloRecria():
            ciclo.dataApartar = dataParaTipoDeCiclo;
            break;
      }

      ciclo.ano = new Date(filho.dataInicio).getFullYear();
      ciclo.numero = await this.cicloRepository.max() + 1;
      ciclo.descricao = `${Constantes.DescricaoCiclo()} ${ciclo.numero}`;;

      return ciclo;
   }

   obterCiclosApartirDe = async (ano) => {

      let result = await this.cicloRepository.obterApartirDe(ano);

      return result;
   }

   obterCiclosFilhosPorIds = async (ids) => {
      let result = [];

      for (let i = 0; i < ids.length; i++) {
         let filhos = await this.cicloFilhoRepository.obterPorCicloId(ids[i]);
         result = result.concat(filhos);
      }

      return result;
   }

   removerCiclo = async (id) => {

      let filhos = await this.cicloFilhoRepository.obterPorCicloId(id);

      for (let i = 0; i < filhos.length; i++) {
         await this.cicloFilhoRepository.remover(filhos[i].id);
      }
      await this.cicloRepository.remover(id);

      return id;
   }

   atualizarCiclo = async (item) =>{

      let numero = item.numero;

      item = this.montarCiclo(item);

      this.removerLancamentosPorCicloId(item.id);

      item.numero = numero;
      item.id = await this.cicloRepository.atualizar(item);

      await this.montarLancamentosDoCiclo(item);

      return item.id;
   }

   salvarCiclo = async (filho) =>{

      let ciclo;

      if (filho.cicloId == undefined) {

         ciclo = await this.montarCiclo(filho);
         ciclo.id = await this.cicloRepository.salvar(ciclo);

      } else {
         ciclo = await this.cicloRepository.obterPorId(filho.cicloId);
      }

      filho.valorGastosExtra = filho.valorGastosExtra == undefined ? 0 : filho.valorGastosExtra;

      let valorCiclo = (filho.valorRacao * filho.quantidadeRacao * filho.quantidadeDias * filho.quantidadeAnimais) +
         filho.valorMedicamentos + filho.valorGastosExtra;

      filho.valor = valorCiclo;
      let now = new Date();
      now.setDate(new Date(filho.dataInicio).getDate() + filho.quantidadeDias)
      filho.dataTermino = now;
      filho.cicloId = ciclo.id;
      filho.id = await this.cicloFilhoRepository.salvar(filho);

      ciclo.valorCicloEstimado += filho.valor;
      await this.cicloRepository.atualizar(ciclo);

      return filho.id;
   }

   simularCiclo = async (item) => {

      return this.montaCiclo(item);
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

   obterFilhotes = async () => {
      let situacoes = ["PI", "PII", "I", "C", "RN"];
      let result = await this.obterAnimalPorSituacao(situacoes);

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

   obterAcompanhamentosPorAno = async (ano) => {
      let femeas = await this.animalRepository.obterPorSexo("F");

      for (let i = 0; i < femeas.length; i++) {
         let item = femeas[i];
         item.acompanhamentos = await this.acompanhamentoRepository.obterPorFemea(item.id);
      }

      return femeas;
   }

   obterAcompanhamentosPorAnimal = async (id) => {
      let acompanhamentos = await this.acompanhamentoRepository.obterPorFemea(id);

      return acompanhamentos;
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

   salvarAcompanhamento = async (item) => {

      if (!item.id) {

         let acompanhamentos = await this.acompanhamentoRepository.obterPorFemea(item.femeaId);

         for (let i = 0; i < acompanhamentos.length; i++) {
            let acompanhamento = acompanhamentos[i];
            acompanhamento.ativo = false;
            await this.acompanhamentoRepository.atualizar(acompanhamento);
         }

         let animal = await this.animalRepository.obterPorId(item.femeaId);
         let especie = await this.especieRepository.obterPorId(animal.especieId);

         item.programarDatasDeAcompanhamento(especie);

         let id = await this.acompanhamentoRepository.salvar(item);

         if (item.existeDataParto()) {
            let mae = await this.animalRepository.obterPorId(item.femeaId);
            
            await this.criarfilhotesNascidos(mae, item);
         }

         return id;
      }
   }

   atualizarAcompanhamento = async (item) => {

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

         item.programarDatasDeAcompanhamento(especie);
      }

      if (item.pariu(acompanhamento)) {
         await this.criarfilhotesNascidos(mae, item);
      }

      let result = await this.acompanhamentoRepository.atualizar(item);

      return result;
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

   criarfilhotesNascidos = async (mae, acompanhamento) => {

      let quantidadeSexoM = acompanhamento.quantidadeSexoM;
      let quantidadeSexoF = acompanhamento.quantidadeSexoF;

      for (let i = 0; i < acompanhamento.quantidadeFilhoteVV; i++) {
         let filhote = new Animal();

         filhote.maeId = mae.id;
         filhote.paiId = acompanhamento.reprodutorId;
         filhote.especieId = mae.especieId;
         filhote.dataNascimento = acompanhamento.dataPartoReal;
         filhote.raca = mae.raca;
         filhote.situacao = acompanhamento.situacaoNascimento;
         filhote.numero = await this.animalRepository.max() + 1;

         if (quantidadeSexoM > 0) {
            filhote.sexo = Constantes.SexoMasculino();
            quantidadeSexoM--;

         } else if (quantidadeSexoF > 0) {
            filhote.sexo = Constantes.SexoFeminino();
            quantidadeSexoF--;
         }

         await this.animalRepository.salvar(filhote);
      }
   }

   atualizarSituacoes = async (especieId) => {
      let especie = await this.especieRepository.obterPorId(especieId);
      let animais = await this.animalRepository.obterPorEspecie(especie.id);

      for (let i = 0; i < animais.length; i++) {
         let animal = ManejoFactory.factoryMethod(especie.codigo, animais[i]);
         animal.atualizarSituacao();
         await this.animalRepository.atualizar(animal);
      }

      especie.dataUltimaAtualizacao = new Date();
      await this.especieRepository.atualizar(especie);
   }
}
