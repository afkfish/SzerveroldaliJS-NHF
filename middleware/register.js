module.exports = () => {
	const bcrypt = require("bcrypt");
	const User = require("../models/users");
	return (req, res, next) => {
		if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {
			return next();
		}
		User.findOne({ username: req.body.username }, (error, user) => {
			if (error || !user) {
				let nuser = new User();
				nuser.username = req.body.username;
				bcrypt.hash(req.body.password, 10, (error, hash) => {
					if (error) {
						return next(error);
					}
					nuser.password = hash;
					nuser.save((error) => {
						if (error) {
							return next(error);
						}
						return res.redirect("/");
					});
				});
			} else {
				res.locals.error = "Username already exists!";
				return next();
			}
		});
	};
};
