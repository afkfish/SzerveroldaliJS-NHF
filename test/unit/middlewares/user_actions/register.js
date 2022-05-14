const expect = require("chai").expect;
const register = require("../../../../middleware/user_actions/register");

describe("user registration", () => {
	it("should return next when username or pass not defined", (done) => {
		let bcrypt,
			req = {
				body: {},
			},
			res,
			obj = {
				UserModel: {},
			};
		register(obj, bcrypt)(req, res, (err) => {
			done();
		});
	});
	it("should return next with error when save to db did not fulfill", (done) => {
		let bcrypt = {
				hash: (f1, f2) => {
					return Promise.resolve("alma");
				},
			},
			req = {
				body: {
					username: "alma",
					password: "alma",
				},
			},
			res,
			obj = {
				UserModel: {
					findOne: () => {
						return Promise.resolve();
					},
					save: (err) => {
						err();
					},
				},
			};
		register(obj, bcrypt)(req, res, (err) => {
			done();
		});
	});
	it("should return next with error when user already exists", (done) => {
		let bcrypt = {
				hash: (f1, f2) => {
					return Promise.resolve("alma");
				},
			},
			req = {
				body: {
					username: "alma",
					password: "alma",
				},
			},
			res = {
				redirect: (url) => {},
				locals: {},
			},
			obj = {
				UserModel: {
					findOne: () => {
						return Promise.resolve("user");
					},
					save: (err) => {},
				},
			};
		register(obj, bcrypt)(req, res, (err) => {
			expect(res.locals.error).to.be.eql("Username already exists!");
			done();
		});
	});
	it("should return next with error when hash throws error", (done) => {
		let bcrypt = {
				hash: () => {
					return Promise.reject("alma");
				},
			},
			req = {
				body: {
					username: "alma",
				},
			},
			res = {
				redirect: (url) => {},
			},
			obj = {
				UserModel: {
					findOne: () => {
						return Promise.resolve(undefined);
					},
					save: (err) => {},
				},
			};
		register(obj, bcrypt)(req, res, (err) => {
			done();
		});
	});
	it("should return next with error when hash throws error", (done) => {
		let bcrypt = {
				hash: () => {
					return Promise.resolve("alma");
				},
			},
			req = {
				body: {
					username: "alma",
				},
			},
			res = {
				redirect: (url) => {
					done();
				},
			},
			obj = {
				UserModel: {
					findOne: () => {
						return Promise.resolve(undefined);
					},
					save: (err) => {},
				},
			};
		register(obj, bcrypt)(req, res, (err) => {
			done();
		});
	});
});
