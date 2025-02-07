import * as express from 'express';
import teamRout from './router/teamRout';
import loginRout from './router/loginRout';
import matchesRout from './router/matchesRout';
import routLeader from './router/LeaderBordRout';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.teamRout();
    this.loginRout();
    this.matchesRout();
    this.routLeader();

    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  private teamRout(): void {
    this.app.use(teamRout);
  }

  private matchesRout(): void {
    this.app.use(matchesRout);
  }

  private loginRout(): void {
    this.app.use(loginRout);
  }

  private routLeader(): void {
    this.app.use(routLeader);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
