/**
 * lekerdezi az adatbazisbol egy lejatszasi lista adatait
 */
module.exports = (obj) => {
	const Playlists = obj.PlaylistModel;
	return (req, res, next) => {
		Playlists.findOne({ creator: req.session.userid, _id: req.params.pid }, (error, playlist) => {
			if (error) {
				return next(error);
			}

			res.locals.playlist = playlist;
			return next();
		});
	};
};
