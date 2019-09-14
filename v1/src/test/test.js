import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

//configure chai to use chai-http
chai.use(chaiHttp);
chai.should();


let usertoken;
let admintoken;
let userId;
let requestId;

describe("POST /auth/login", () => {
    describe("POST /auth/signup", () => {
            //SIGNING IN USERS
            it('it should be able to sign un a user', (done) => {
                const user = {
                    username : "tobby",
                    password : "12"
                }
                chai.request(app)
                    .post('/auth/signup')
                    .send(user)
                    .end((err, res) => {
                        res.should.have.a.status(200)
                        usertoken = res.usertoken
                        done();
                    });
            });
        })

    //SIGNING IN USERS
    it('it should be able to sign up a user', (done) => {
        const user = {
            username : "tobby",
            password : "12"
        }
        chai.request(app)
        .post('/auth/signup')
        .send(user)
        .end((err, res) => {
            res.should.have.a.status(200)
            userId = res.userId
                });
                done();
        });
    })

    describe("POST /auth/login", () => {
        //SIGNING IN ADMIN
        it('it should be able to sign in the admin', (done) => {
            const admin = {
                    username : process.env.ADMINUSERNAME,
                    password : process.env.ADMINPASSWORD
                }
                chai.request(app)
                    .post('/auth/login')
                    .send(admin)
                    .end((err, res) => {
                        res.should.have.a.status(200)
                        admintoken = res.admintoken
                    });
                    done();
            });
        })

    describe("GET /api/v1/:userId/requests ", () => {
        it('it should get a request by a given id', (done) => {
            // let id = 1;
            chai.request(app)
                .get(`/api/v1/${userId}/requests`)
                .set('Authorization', `Bearer ${usertoken}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.should.be.a('object');
                    done();
                })
        })
    })

    describe("GET /api/v1/user/:userid/profile", () => {
        it('it should be able to show a user profile', (done) => {
            chai.request(app)
                .get(`/api/v1/user/${userId}/profile`)
                .set('Authorization', `Bearer ${usertoken}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    done();
                })
        })
    })


    describe("PUT /api/v1/user/:userid/update", () => {
        it('it should be able to update users profile', (done) => {
            const updateProfile = {
                email: 'ananipaul2000@gmail.com',
                profileimage: 'https://res.cloudinary.com/oluwatobby/image/upload/v1566641521/ce48a2a413804d457ab2ee2796e8f33f-removebg-preview_v4kpt4.png'
            }
            chai.request(app)
                .put('/api/v1/user/:userid/update')
                .send(updateProfile)
                .set('Authorization', `Bearer ${usertoken}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    done();
                })
        })
    })

    describe("GET /api/v1/admin/allusers", () => {
        it('it should be able to get all logged in users for admin', (done) => {
            chai.request(app)
                .get('/api/v1/admin/allusers')
                .set('Authorization', `Bearer ${admintoken}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    done();
                })
        })
    })

    describe("GET /api/v1/requests", () => {
        it('it should be able to get all requests from the database', (done) => {
            chai.request(app)
                .get('/api/v1/requests')
                .set('Authorization', `Bearer ${admintoken}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    done();
                })
        })
    })

       describe('POST /api/v1/users/requests', ()=>{
        it('it should be able to post a request' , (done)=>{
            let request = {
                    title: 'request',
                    category: 'maintainance',
                    description: 'updated'
            }
            chai.request(app)
            .post(`/api/v1/users/requests`)
            .set('Authorization', `Bearer ${usertoken}`)
            .send(request)
            .end((err , res)=>{
                res.should.have.status(200)
                res.body.should.be.an('object')
                requestId = res.id;
                done();
            })
        })
    })

      describe('GET /api/v1/users/requests/:id', ()=>{
        it('it should get a request' , (done)=>{
            chai.request(app)
            .put(`/api/v1/users/requests/${requestId}`)
            .set('Authorization', `Bearer ${usertoken}`)
            .end((err , res)=>{
                res.should.have.status(200)
                res.body.should.be.an('object')
                done();
            })
        })
    })

    describe('PUT /api/v1/users/requests/:id', ()=>{
    it('it should update a request' , (done)=>{
        let request = {
                title: 'request update',
                category: 'maintainance',
                description: 'request updated'
        }
        chai.request(app)
        .put(`/api/v1/users/requests/${requestId}`)
        .set(`Authorization`, `Bearer ${usertoken}`)
        .send(request)
        .end((err , res)=>{
            res.should.have.status(200)
            res.body.should.be.an('object')
            done();
        })
    })
})


    // describe('PUT /api/v1/users/requests/:id', ()=>{
    //     it('it should update a request' , (done)=>{
    //         let id = 1
    //         let request = {
    //                 title: 'request',
    //                 category: 'maintainance',
    //                 description: 'updated'
    //         }
    //         chai.request(app)
    //         .put(`/api/v1/users/requests/${id}`)
    //         .send(request)
    //         .end((err , res)=>{
    //             res.should.have.status(200)
    //             res.body.should.have.property('message').eql('request updated !!')
    //             res.body.should.be.an('object')
    //             done();
    //         })
    //     })
    // })
