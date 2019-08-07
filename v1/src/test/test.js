import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

//configure chai to use chai-http
chai.use(chaiHttp);
chai.should();

describe("requests", () => {
    describe("GET /api/v1/users/requests", () => {
        //GETING ALL REQUESTS
        it('should be able to get all requests', (done) => {
            chai.request(app)
                .get('/api/v1/users/requests')
                .end((err, res) => {
                    res.should.have.a.status(200)
                    res.body.should.be.a('array');
                    done();
                });
        });
    })
})