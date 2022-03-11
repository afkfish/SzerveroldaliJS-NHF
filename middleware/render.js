module.exports = function (name) {
	return function (req, res, next) {
		res.render(name);
	};
};
