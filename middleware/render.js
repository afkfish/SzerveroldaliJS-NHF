module.exports = (name) => {
	return (req, res, next) => {
		res.render(name);
		return next();
	};
};
