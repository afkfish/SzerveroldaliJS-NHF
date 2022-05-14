const expect = require("chai").expect;
const checkpw = require("../../../../middleware/user_actions/checkpw");

describe("check users password in db", () => {
	it("should return next when no password and username is defined", (done) => {
		const obj = {
			UserModel: {},
		};
		let req = {
			body: {},
		};
		let res = {};

		checkpw(obj, undefined)(req, res, (err) => {
			done();
		});
	});
	it("should return error because of wrong credentails", function (done) {
		const obj = {
			UserModel: {
				findOne: (s, cb) => {
					cb(true, undefined);
				},
			},
		};
		let req = {
			body: {
				username: "alma",
				password: "alma",
			},
		};
		let res = {
			locals: {},
		};
		checkpw(obj, undefined)(req, res, (err) => {
			expect(res.locals.error).to.be.eql("Wrong username or password!");
			done();
		});
	});
	it("should redirect after correct cred", function (done) {
		const obj = {
			UserModel: {
				findOne: (s, cb) => {
					cb(false, {
						password: "123",
					});
				},
			},
		};
		let bcrypt = {
			compare: (f1, f2) => {
				return Promise.resolve();
			},
		};
		let req = {
			body: {
				username: "alma",
				password: "alma",
			},
			session: {},
		};
		let res = {
			locals: {},
			redirect: (url) => {
				done();
			},
		};
		checkpw(obj, bcrypt)(req, res, (err) => {});
	});
	it("should redirect after correct cred", function (done) {
		const obj = {
			UserModel: {
				findOne: (s, cb) => {
					cb(false, {
						password: "123",
					});
				},
			},
		};
		let bcrypt = {
			compare: (f1, f2) => {
				return Promise.reject();
			},
		};
		let req = {
			body: {
				username: "alma",
				password: "alma",
			},
			session: {},
		};
		let res = {
			locals: {},
			redirect: (url) => {},
		};
		checkpw(obj, bcrypt)(req, res, (err) => {
			expect(res.locals.error).to.be.eql("Wrong username or password!");
			done();
		});
	});
});
