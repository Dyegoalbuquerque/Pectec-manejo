import { Repository } from './repository';
import { CausaObito } from '../models/causaObito';

export class CausaObitoRepository extends Repository {

    constructor() {
        super("causaObitos", CausaObito);
    }
}