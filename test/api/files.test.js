// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const { expect } = require('chai');
// let mongoose = require("mongoose");
// let Book = require('../app/models/book');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../index');

const fileHelper = require('./helper/fileHelper');

chai.use(chaiHttp);
// Our parent block
describe('Files', () => {
  beforeEach((done) => {
    fileHelper.createFolder('images');

    for (let x = 0; x < 1; x += 1) {
      fileHelper.createFile(`images/${x}.png`);
    }
    done();
  });

  afterEach((done) => {
    fileHelper.deleteFolder('images');
    done();
  });

  /*
  * Test the /GET route
  */
  describe('/GET list', () => {
    it('it should GET all files', (done) => {
      chai.request(server)
        .get('/api/files/list')
        .end((err, res) => {
          expect(res.status).equals(200);
          expect(res.body[0]).equals('0.png');
          done();
        });
    });
  });
});
