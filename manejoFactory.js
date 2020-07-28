import { Suino } from './models/suino';

export class ManejoFactory {

    constructor() { }

    static factoryMethod(especie, animal) {

        switch (especie) {
            case "S":
                return this.criarSuino(animal);
                break;
            default: return null;
        }
    }

    static criarSuino(animal) {
        let suino = new Suino();
        suino.id = animal.id;
        suino.especieId = animal.especieId;
        suino.situacao = animal.situacao;
        suino.numero = animal.numero;
        suino.raca = animal.raca;
        suino.sexo = animal.sexo;
        suino.nome = animal.nome;
        suino.maeId = animal.maeId;
        suino.paiId = animal.paiId;
        suino.quantidadeCiclo = animal.quantidadeCiclo;
        suino.dataNascimento = animal.dataNascimento;

        return suino;
    }
}