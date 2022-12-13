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
    describe("test Get all order", function () { ///describe kumpulan tes individual Dibutuhkan dua parameter, yang pertama adalah nama yang bermakna untuk fungsionalitas yang diuji dan yang kedua adalah fungsi yang berisi satu atau beberapa tes. menggambarkan () dapat bersarang.
        it("success get order", function (done) { /// it : Individual Test Dibutuhkan dua parameter, parameter pertama adalah nama untuk pengujian dan parameter kedua adalah fungsi yang menampung isi pengujian.
            api.get(allOrderApi)
                .set("Authorization", "Bearer " + process.env.bookingBookToken)

                .end(function (err, res) {
                    //console.log(res.body);
                    expect(res.status).to.equals(200);
                    expect(res.body).to.be.jsonSchema(allOrderSchema.validData);

                    done();
                });
        });
    })
}