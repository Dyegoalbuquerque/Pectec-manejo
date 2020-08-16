
import { Repository } from './repository';
import { CicloCrescimento } from '../models/cicloCrescimento';

export class CicloCrescimentoRepository extends Repository{

    constructor() {
        super(CicloCrescimento);
    }
}