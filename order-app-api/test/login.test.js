process.env.NODE_ENV = 'test';
const chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

const url = `http://localhost:8000/`;
const request = require('supertest')(url);

// This unit test will check request api success and faile
describe('Checking Authentication login', () => {
  let authInfo = {
    "username": "user1@test.com",
    "password": "123456"
  }

  it('POST -> Username/password ->Expect Status 200 OK', (done) => {
    request.post('auth/login')
    .set('Content-Type',  'application/json')
    .send(authInfo)
    .end((err,res) => {
      res.should.have.status(200);
      res.body.should.be.a('object').have.property('data').have.property('userToken')
      if (err) return done(err);
      done();
    })
  })

  it('POST -> Username/password -> Expect Status 400 Wrong', (done) => {
    request.post('auth/login')
      .set('Content-Type', 'application/json')
      .send([])
      .end((err, res) => {
        res.should.have.status(400);
        // res.body.should.be.a('object').have.property('data').have.property('userToken')
        if (err) return done(err);
        done();
      })
  })
});
