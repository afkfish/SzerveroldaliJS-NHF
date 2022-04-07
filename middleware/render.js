/**
 * rendereli a megadott oldalt
 * @param obj
 * @param name ejs file neve
 */
module.exports = (obj, name) => {
	return (req, res, next) => {
		if (req.cookies.theme === "dark") {
			res.locals.theme = "dark";
		} else {
			res.locals.theme = "light";
		}
		return res.render(name);
	};
};
