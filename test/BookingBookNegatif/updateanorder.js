const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiJsonSchema = require("chai-json-schema");
const { it } = require("mocha");
chai.use(chaiJsonSchema);
chai.use(chaiHttp);
require("dotenv").config();
const updateAnOrderSchema = require('../../resources/schema/bookingbooknegatif/updateanorder.json')
const api = chai.request(process.env.bookingBookUrl);
let updateAnOrderApi = "/orders/"

module.exports = function () {
    describe("test update an order", function () {
        let idCostumerName = "E2SH0XRbiwF8XwOjlDB3Y"

        it("Gagal : create order with invalid name and valid ID", function (done) {
            api.patch(updateAnOrderApi + idCostumerName)
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .send({
                    "customerName": "0"
                })

                .end(function (err, res) {
                    expect(res.status).to.equals(400);
                    expect(res.body.error).to.equals("Invalid or missing customer name.");
                    expect(res.body).to.be.jsonSchema(updateAnOrderSchema.invalidName);
                    done();
                });
        });

        it("Gagal : create order with valid name and invalid ID", function (done) {
            api.patch(updateAnOrderApi + idCostumerName + '123')
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .send({
                    "customerName": "diosy123"
                })

                .end(function (err, res) {
                    expect(res.status).to.equals(404);
                    expect(res.body.error).to.equals("No order with id E2SH0XRbiwF8XwOjlDB3Y123.");
                    expect(res.body).to.be.jsonSchema(updateAnOrderSchema.invalidName);
                    done();
                });
        });
    })
}