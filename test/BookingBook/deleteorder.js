const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiJsonSchema = require("chai-json-schema");
const { it } = require("mocha");
chai.use(chaiJsonSchema);
chai.use(chaiHttp);
require("dotenv").config();
const deleteOrderSchema = require("../../resources/schema/bookingbook/delete.json");
const api = chai.request(process.env.bookingBookUrl);
let deleteOrderApi = "/orders/"

module.exports = function () {
    describe("test delete order", function () {
        let idCostumerName = "BHUKhxCiDSPv7-ugSUgh2"

        it("success create order", function (done) {
            api.delete(deleteOrderApi + idCostumerName)
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .end(function (err, res) {
                    expect(res.status).to.equals(204);
                    expect(res.body).to.be.jsonSchema(deleteOrderSchema);
                    done();
                });
        });
    })
}