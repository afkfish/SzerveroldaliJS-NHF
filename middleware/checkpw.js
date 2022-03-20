module.exports = () => {
	return (req, res, next) => {
		if (
			typeof req.body.username === "undefined" ||
			typeof req.body.password === "undefined"
		) {
			return next();
		}
		if (req.body.username === "test" && req.body.password === "test") {
			return res.redirect("/playlists");
		}
		res.locals.error = "Wrong username or password!";
		return next();
	};
};
