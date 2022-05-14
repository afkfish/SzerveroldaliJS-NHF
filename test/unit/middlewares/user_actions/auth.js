const expect = require("chai").expect;
const auth = require("../../../../middleware/user_actions/auth");

describe("authenticate user", () => {
	it("should call next when user is authenticated already", function (done) {
		let req = {
			session: {
				userid: "a",
			},
		};
		let res = {
			redirect: (url) => {},
		};
		auth()(req, res, (err) => {
			done();
		});
	});
	it("should redirect to /", function (done) {
		let req = {
			session: {},
		};
		let res = {
			redirect: (url) => {
				done();
			},
		};
		auth()(req, res, (err) => {});
	});
});
