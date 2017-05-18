
const chai = require('chai');
const chaiHtpp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHtpp)

describe('Routes', () => {
  
  let server;

  beforeEach(() => {
    server = require('./server');
  })

  afterEach(() => {
    server.close();
  })

  it('/ should response', done => {
    chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  })

  it('/api/card/all should return a list of ids', done => {
    chai.request(server)
      .get('/api/card/all')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('/api/card/:id should return a single card', done => {
    chai.request(server)
      .get('/api/card/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

});

