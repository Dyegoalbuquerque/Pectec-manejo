import { Repository } from './repository';
import { Local } from '../models/local';

export class LocalRepository extends Repository {

    constructor() {
        super(Local);
    }
}