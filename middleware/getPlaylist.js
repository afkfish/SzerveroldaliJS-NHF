module.exports = () => {
	return (req, res, next) => {
		res.locals.id = req.params.id;
		res.locals.playlist = {
			name: res.locals.id,
			date: "2022.03.21",
		};
		res.locals.songs = [
			{
				name: "neeee",
				artist: "Feri",
				genre: "DMB",
			},
		];
		return next();
	};
};
