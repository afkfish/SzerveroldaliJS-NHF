const expect = require("chai").expect;
const logout = require("../../../../middleware/user_actions/logout");

describe("destroy session", () => {
	it("should call destroy and redirect", function (done) {
		let req = {
			session: {
				destroy: () => {},
			},
		};
		let res = {
			redirect: (url) => {
				done();
			},
		};
		logout()(req, res, (err) => {});
	});
});
