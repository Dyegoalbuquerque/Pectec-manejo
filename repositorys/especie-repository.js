
import { Repository } from './repository';
import { Especie } from '../models/especie';

export class EspecieRepository extends Repository{

    constructor() {
        super("especies", Especie);
    }
}