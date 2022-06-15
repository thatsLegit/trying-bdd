const expect = require("chai").expect;
const sinon = require("sinon");

const user = {
    addUser: (name) => {
        this.name = name;
    }
}

describe("getIndexPage", function() {
    const getIndexPage = require("../app/spies.js").getIndexPage;

    it("should return index page", function() {
        let req = {
            body: sinon.spy()
        }
        // Have `res` have a send key with a function value coz we use `res.send()` in our func
        let res = {
            send: sinon.spy()
        }

        getIndexPage(req, res);
        expect(res.send.calledOnce).to.be.true;
        // expect to get argument `bla` on first call
        expect(res.send.firstCall.args[0]).to.equal("Hey");
    });
});

describe("User", function() {
    describe("addUser", function() {
        it("should add a user", function() {
            sinon.spy(user, "addUser");

            // lets log `addUser` and see what we get
            console.log(user.addUser);
        });
    });
});