import Express from 'express';
import bodyParser from 'body-parser';
import routes from './index';

export class App {
  
  app = Express();

  startup(port) {
    this.setupRoutes();

    this.app.listen(port, () => console.log(`web api running http://localhost:${port}`));
  }

  setupRoutes() {

    this.app.use(bodyParser.json());
    this.app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*"); 
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.append('Access-Control-Allow-Methods', 'PUT');
        res.append('Access-Control-Allow-Methods', 'DELETE');
        res.append('Access-Control-Allow-Methods', 'POST');
        next();
    });
    this.app.use('/', routes);
  }
}

let port = process.env.PORT || 5000;

const app = new App();

app.startup(port);