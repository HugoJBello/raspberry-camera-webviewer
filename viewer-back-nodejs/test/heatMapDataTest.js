//During the test the env variable is set to test
process.env.NODE_ENV = 'test';


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();

chai.use(chaiHttp);

/*
  * Test the /GET route
  */
describe('/GET data', () => {
    it('it should GET all data', (done) => {
        chai.request(server)
            .get('/images/heat_map_data_date/day=2018-02-02')
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
                done();
            });
    });
});
