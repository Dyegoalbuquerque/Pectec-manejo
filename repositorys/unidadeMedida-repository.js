
import { Repository } from './repository';
import { UnidadeMedida } from '../models/unidadeMedida';

export class UnidadeMedidaRepository extends Repository{

    constructor() {
        super(UnidadeMedida);
    }
}