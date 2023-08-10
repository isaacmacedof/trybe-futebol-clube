import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import { Response } from 'superagent';
// import Example from '../database/models/ExampleModel';
import TeamsModel from '../database/models/teams.model';
import { teams } from './teamsMock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Test in "teamRout"', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
  let app: App;
  beforeEach(() => {
    app = new App();
  });

  it('Testing a "/" for server open', async function() {
    const response = await chai.request(app.app).get('/');
    expect(response.status).to.equal(200);
  });
  it('Testing a "/teams" for get', async function () {
    let chaiHttpResponse: Response;
    
    sinon.stub(TeamsModel, 'findAll').resolves(teams as any);
    const request = await chai.request(app.app).get('/teams');
    const { status } = request;
    expect(status).to.eq(200);
    expect(request.body).to.deep.equal(teams);
  })
  it('Testing a "/teams" for get with json', async function () {
    let chaiHttpResponse: Response;
    
    sinon.stub(TeamsModel, 'findByPk').resolves(teams[0] as any);
    const request = await chai.request(app.app).get('/teams/1');
    const { status } = request;
    expect(status).to.eq(200);
    expect(request.body).to.deep.equal(teams[0]);
  })
  it('Testing a "/teams" for get null', async function () {
    let chaiHttpResponse: Response;
    
    sinon.stub(TeamsModel, 'findOne').resolves(null);
    const request = await chai.request(app.app).get('/teams/1123132');
    const { status } = request;
    expect(status).to.eq(404);
    expect(request.body).to.deep.equal({ message: '"id" not found'});
  })
  afterEach(sinon.restore);

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
});
