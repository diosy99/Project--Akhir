const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiJsonSchema = require("chai-json-schema");
const { it } = require("mocha");
chai.use(chaiJsonSchema);
chai.use(chaiHttp);
require("dotenv").config();
const submitAnOrderSchema = require("../../resources/schema/bookingbook/submitanorder.json");
const api = chai.request(process.env.bookingBookUrl);
let SubmitAnOrderApi = "/orders"

module.exports = function () {
    describe("test submit an order", function () {

        it("success create order", function (done) {
            api.post(SubmitAnOrderApi)
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .send({
                    "bookId": 1,
                    "customerName": "John109"

                })

                .end(function (err, res) {
                    //console.log(res.body.created);
                    expect(res.status).to.equals(201);
                    expect(res.body.created).to.equals(true);
                    expect(res.body).to.be.jsonSchema(submitAnOrderSchema.validData);

                    done();
                });
        });
    })
}