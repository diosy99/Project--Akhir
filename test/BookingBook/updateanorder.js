const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiJsonSchema = require("chai-json-schema");
const { it } = require("mocha");
chai.use(chaiJsonSchema);
chai.use(chaiHttp);
require("dotenv").config();
const api = chai.request(process.env.bookingBookUrl);
let updateAnOrderApi = "/orders/"

module.exports = function () {
    describe("test update an order", function () {
        let idCostumerName = "5dQ8M09LbIZVE-kApX3dN"

        it("success create order", function (done) {
            api.patch(updateAnOrderApi + idCostumerName)
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .send({

                    "customerName": "John12"

                })

                .end(function (err, res) {
                    expect(res.status).to.equals(204);
                    done();
                });
        });
    })
}