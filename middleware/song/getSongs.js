/**
 * lekerdezi az adatbazisbol a szamokat egy playlisthez
 */
module.exports = (obj, mode) => {
	const Songs = obj.SongModel;
	return (req, res, next) => {
		if (mode === "pl") {
			Songs.find({ _pl: res.locals.playlist._id }, (error, songs) => {
				if (error) {
					return next(error);
				}

				res.locals.songs = songs;
				return next();
			});
		} else if (mode === "ar") {
			Songs.find({ _ar: res.locals.artist._id }, (error, songs) => {
				if (error) {
					return next(error);
				}

				res.locals.songs = songs;
				return next();
			});
		}
	};
};
