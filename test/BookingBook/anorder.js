const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiJsonSchema = require("chai-json-schema");
const { it } = require("mocha");
chai.use(chaiJsonSchema);
chai.use(chaiHttp);
require("dotenv").config();
const anOrderSchema = require("../../resources/schema/bookingbook/anorder.json");
const api = chai.request(process.env.bookingBookUrl);
let anOrderApi = "/orders/"

module.exports = function () {
    describe("test Get an order", function () {
        let idCostumerName = "5dQ8M09LbIZVE-kApX3dN"

        it("success create order", function (done) {
            api.get(anOrderApi + idCostumerName)
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .end(function (err, res) {
                    expect(res.status).to.equals(200);
                    expect(res.body.id).to.equals('5dQ8M09LbIZVE-kApX3dN');
                    expect(res.body).to.be.jsonSchema(anOrderSchema.validData);

                    done();
                });
        });
    })
}