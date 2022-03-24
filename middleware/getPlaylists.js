module.exports = () => {
	return (req, res, next) => {
		res.locals.playlists = [
			{
				name: "pl1",
				creator: "Self",
				date: "2022.03.02",
			},
			{
				name: "pl2",
				creator: "Self",
				date: "2022.03.21",
			},
		];
		return next();
	};
};
