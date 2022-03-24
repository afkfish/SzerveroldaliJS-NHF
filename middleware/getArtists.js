module.exports = () => {
	return (req, res, next) => {
		res.locals.artists = [
			{
				name: "Feri",
				ml: "98",
			},
			{
				name: "Jozsi",
				ml: "67",
			},
		];
		return next();
	};
};
