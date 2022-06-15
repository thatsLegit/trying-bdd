const expect = require("chai").expect;
const sinon = require("sinon");

describe("AppController", function()  {
    const getIndexPage = require("../app/stubs").getIndexPage;
    let user, req, res;

    // instantiate a user object with an empty isLoggedIn function
    beforeEach(() => {
        user = {
            isLoggedIn: function(){}
        };
        // pass user into the req object
        req = {
            user: user
        };
        // Have `res` have a send key with a function value coz we use `res.send()` in our func
        res = {
            // replace empty function with a spy
            send: sinon.spy()
        };
    });

    describe("getIndexPage", function() {
        it("should send hey when user is logged in", function() {
            // Stub isLoggedIn function and make it return true always
            const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true);

            getIndexPage(req, res);
            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.equal("Hey");

            // assert that the stub is logged in at least once
            expect(isLoggedInStub.calledOnce).to.be.true;
        });

        it("should send something else when user is not logged in", function() {
            // Stub isLoggedIn function and make it return true always
            const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(false);

            getIndexPage(req, res);
            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.equal("Ooops. You need to log in to access this page");

            // assert that the stub is logged in at least once
            expect(isLoggedInStub.calledOnce).to.be.true;
        });
    });
});