
import { MongoClient } from 'mongodb'

export class Dao {

    constructor() {
        this.client = null;
    }

    async connect ()  {
        if (!this.client){
            this.client = new MongoClient(process.env.MONGO_CONNECTION);
        }

        await this.client.connect();
        return this.client.db(process.env.DATABASE_NAME);
    }

    async disconnect () {
        if (!this.client) return true;
        await this.client.close();
        this.client = null;
        return true;
    }
}