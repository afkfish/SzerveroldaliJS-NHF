/**
 * lekerdezi az adatbazisbol a lejatszasi listakat es adataikat
 */
module.exports = () => {
	return (req, res, next) => {
		res.locals.creator = req.session.userid;
		res.locals.playlists = [
			{
				name: "pl1",
				date: "2022.03.02",
			},
			{
				name: "pl2",
				date: "2022.03.21",
			},
		];
		return next();
	};
};
