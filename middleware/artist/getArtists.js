/**
 * lekerdezi az adatbazisbol az eloadokat es az adataikat
 */
module.exports = (obj) => {
	const Artists = obj.ArtistModel;
	return (req, res, next) => {
		Artists.find({ user: req.session.userid }, (error, artists) => {
			if (error) {
				return next(error);
			}

			res.locals.artists = artists;
			return next();
		});
	};
};
