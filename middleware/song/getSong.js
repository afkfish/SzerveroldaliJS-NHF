/**
 * lekerdezi az adatbazisbol egy szam adatait
 */
module.exports = (obj) => {
	const Songs = obj.SongModel;
	return (req, res, next) => {
		Songs.findOne({ _id: req.params.sid }, (error, song) => {
			if (error) {
				return next(error);
			}

			res.locals.song = song;
			return next();
		});
	};
};
