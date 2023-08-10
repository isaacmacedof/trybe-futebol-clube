// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { App } from '../app';
// import { Response } from 'superagent';
// import TeamsModel from '../database/models/teams.model';
// import { teams } from './teamsMock';

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Test in "teamRout"', () => {
//   let app: App;
//   beforeEach(() => {
//     app = new App();
//   });

//   it('Testing a "/" for server open', async function() {
//     const response = await chai.request(app.app).get('/');
//     expect(response.status).to.equal(200);
//   });
//   it('Testing a "/teams" for get', async function () {
//     let chaiHttpResponse: Response;
    
//     sinon.stub(TeamsModel, 'findAll').resolves(teams as any);
//     const request = await chai.request(app).get('/teams');
//     const { status } = request;
//     expect(status).to.eq(200);
//     expect(request.body).to.deep.equal(teams);
//   })
// });