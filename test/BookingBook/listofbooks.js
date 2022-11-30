const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const chaiJsonSchema = require("chai-json-schema");
const { it } = require("mocha");
chai.use(chaiJsonSchema);
chai.use(chaiHttp);
require("dotenv").config();
const listOfBookSchema = require("../../resources/schema/bookingbook/listofbook.json");
const api = chai.request("https://simple-books-api.glitch.me");
let listOfBookApi = "/books"

module.exports = function () {
    describe("test Get List Of order", function () {
        it("success get order", function (done) {
            api.get("/orders")
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equals(200);
                    expect(res.body).to.be.jsonSchema(listOfBookSchema.validData);

                    done();
                });
        });
    })
}