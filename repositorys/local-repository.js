import { Repository } from './repository';

export class LocalRepository extends Repository {

    constructor() {
        super("locais");
    }
}