const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiJsonSchema = require("chai-json-schema");
const { it } = require("mocha");
chai.use(chaiJsonSchema);
chai.use(chaiHttp);
require("dotenv").config();
const submitAnOrderSchema = require("../../resources/schema/bookingbooknegatif/submitanorder.json");
const api = chai.request(process.env.bookingBookUrl);
let SubmitAnOrderApi = "/orders"

module.exports = function () {
    describe("test submit an order", function () {

        it("Gagal : create order with invalid booking Id", function (done) {
            api.post(SubmitAnOrderApi)
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .send({
                    "bookId": 0,
                    "customerName": "John109"

                })

                .end(function (err, res) {
                    expect(res.status).to.equals(400);
                    expect(res.body.error).to.equals("Invalid or missing bookId.");
                    expect(res.body).to.be.jsonSchema(submitAnOrderSchema.invalidId);
                    done();
                });
        });

        it("Gagal : create order with invalid booking name", function (done) {
            api.post(SubmitAnOrderApi)
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .send({
                    "bookId": 1,
                    "customerName": "0"

                })

                .end(function (err, res) {
                    expect(res.status).to.equals(400);
                    expect(res.body.error).to.equals("Invalid or missing customer name.");
                    expect(res.body).to.be.jsonSchema(submitAnOrderSchema.invalidName);
                    done();
                });
        });
    })
}