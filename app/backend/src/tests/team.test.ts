import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import { Response } from 'superagent';
// import Example from '../database/models/ExampleModel';


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
