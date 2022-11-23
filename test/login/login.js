const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiJsonSchema = require("chai-json-schema");
chai.use(chaiJsonSchema)

chai.use(chaiHttp);
require('dotenv').config()

const api = chai.request(process.env.bookingBookUrl);
const loginSchema = require("../../Resource/login/login.json");
let  loginApi = "/api-clients/" 

module.exports = function (){
    describe("Test login", function () {

        it("Success login", function (done) {
            api.post(loginApi)
            .send({
                    "clientName" : process.env.name,
                    "clientEmail" : process.env.email,
                 
            })
            .end(function (err, res) {
                expect(res.status).to.equals(201);
                expect(res.body).to.jsonSchema(loginSchema.validData)
                done();
            });
        });
    })
}