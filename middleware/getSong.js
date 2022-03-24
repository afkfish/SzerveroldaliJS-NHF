/**
 * lekerdezi az adatbazisbol egy szam adatait
 */
module.exports = () => {
	return (req, res, next) => {
		res.locals.song = {
			name: "neeee",
			artist: "Feri",
			genre: "DMB",
		};
		return next();
	};
};
