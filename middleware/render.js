/**
 * rendereli a megadott oldalt
 * @param name ejs file neve
 */
module.exports = (name) => {
	return (req, res, next) => {
		return res.render(name);
	};
};
