import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server";

//configure chai to use chai-http
chai.use(chaiHttp);
chai.should();





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
