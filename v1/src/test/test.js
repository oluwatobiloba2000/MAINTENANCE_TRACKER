import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

//configure chai to use chai-http
chai.use(chaiHttp);
chai.should();
let token = 0;

describe("signin", () => {
    describe("POST /auth/login", () => {
        //SIGNING IN USERS
        it('it should be able to sign in a user', (done) => {
            const user = {
                username : tobby,
                password : 1234
            }
            chai.request(app)
                .post('/auth/login')
                .send(user)
                .end((err, res) => {
                    res.should.have.a.status(200)
                    
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