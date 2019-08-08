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
    describe("GET /api/v1/users/requests/:id ", () => {
        it('it should get a request by a given id', (done) => {
            let id = 1;
            chai.request(app)
                .get(`/api/v1/users/requests/${id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.a('object');
                    done();
                })
        })
    })

    describe("POST /api/v1/users/requests/", () => {
        it('it should post a request', (done) => {
            const request = {
                title: 'request',
                category: 'maintainance',
                description: 'description of the request',
            }
            chai.request(app)
                .post('/api/v1/users/requests')
                .send(request)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    done();
                })
        })
    })

    describe('PUT /api/v1/users/requests/:id', ()=>{
        it('it should update a request' , (done)=>{
            let id = 1
            let request = {
                    title: 'request',
                    category: 'maintainance',
                    description: 'updated'
            }
            chai.request(app)
            .put(`/api/v1/users/requests/${id}`)
            .send(request)
            .end((err , res)=>{
                res.should.have.status(200)
                res.body.should.have.property('message').eql('request updated !!')
                res.body.should.be.an('object')
                done();
            })
        })
    })
})