const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
require("dotenv").config();

chai.use(chaiHttp);
chai.use(require("chai-json-schema"));

const api = chai.request(process.env.bookingBookUrl);
const loginSchema = require("../../Resource/login/login.json");
let loginApi = "/api-clients/"

module.exports = function () {
    describe("Test login", function () {

        it("Success login", function (done) {
            api.post(loginApi)
                .send({
                    "clientName": process.env.name,
                    "clientEmail": process.env.email,

                })
                .end(function (err, res) {
                    console.log(status)
                    expect(res.status).to.equal(201);
                    expect(res.accessToken).to.equals("")
                    expect(res.body).to.jsonSchema(loginSchema.validData)
                    done();
                });
        });
    })
}