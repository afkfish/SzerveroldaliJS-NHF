module.exports = (action) => {
	return (req, res, next) => {
		if (action === "undefined" || typeof req.cookies.theme === "undefined") {
			res.cookie("theme", "light");
		} else if (action === "toggle") {
			if (req.cookies.theme === "light") {
				res.cookie("theme", "dark");
			} else {
				res.cookie("theme", "light");
			}
			return res.redirect("/");
		}
		return next();
	};
};
