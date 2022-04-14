module.exports = () => {
	const bcrypt = require("bcrypt");
	const User = require("../../models/users");
	return (req, res, next) => {
		if (
			typeof req.body.username === "undefined" ||
			typeof req.body.password === "undefined"
		) {
			return next();
		}
		User.findOne({ username: req.body.username })
			.then((user) => {
				if (!user) {
					let nuser = new User();
					nuser.username = req.body.username;
					bcrypt
						.hash(req.body.password, 10)
						.then((hash) => {
							nuser.password = hash;
						})
						.then(() => {
							nuser.save((error) => {
								if (error) {
									return next(error);
								}
								return res.redirect("/");
							});
						})
						.catch((error) => {
							return next(error);
						});
				} else {
					res.locals.error = "Username already exists!";
					return next();
				}
			})
			.catch((error) => {
				return next(error);
			});
	};
};
