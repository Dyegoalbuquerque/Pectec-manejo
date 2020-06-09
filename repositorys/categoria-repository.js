
import { Repository } from './repository';
import { Categoria } from '../models/categoria';

export class CategoriaRepository extends Repository{

    constructor() {
        super(Categoria);
    }
}