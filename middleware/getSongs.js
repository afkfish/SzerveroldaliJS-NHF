/**
 * lekerdezi az adatbazisbol a szamokat egy playlisthez
 */
module.exports = (obj) => {
	const Songs = obj.SongModel;
	return (req, res, next) => {
		Songs.find({ _pl: res.locals.playlist._id }, (error, songs) => {
			if (error) {
				return next(error);
			}

			res.locals.songs = songs;
			return next();
		});
	};
};
