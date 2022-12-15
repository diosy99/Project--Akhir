const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiJsonSchema = require("chai-json-schema");
const { it } = require("mocha");
chai.use(chaiJsonSchema);
chai.use(chaiHttp);
require("dotenv").config();
const allOrderSchema = require("../../resources/schema/bookingbook/allorder.json");
const api = chai.request("https://simple-books-api.glitch.me");
let allOrderApi = "/orders"

module.exports = function () {
    describe("test Get all order", function () { 
        it("success get order", function (done) { 
            api.get(allOrderApi)
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .end(function (err, res) {
                    expect(res.status).to.equals(200);
                    expect(res.body).to.be.jsonSchema(allOrderSchema.validData);

                    done();
                });
        });
    })
}