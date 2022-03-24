/**
 * az adatbazisbol lekerdezi egy eloado szamait nevet es havi hallgatoinak szamat
 */
module.exports = () => {
	return (req, res, next) => {
		res.locals.id = req.params.id;
		res.locals.artist = {
			name: res.locals.id,
			ml: 98,
		};
		res.locals.songs = [
			{
				name: "neeee",
				genre: "DMB",
			},
		];
		return next();
	};
};
