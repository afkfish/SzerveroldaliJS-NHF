/**
 * lekerdezi az adatbazisbol a lejatszasi listakat es adataikat
 */
module.exports = (obj) => {
	const Playlists = obj.PlaylistModel;
	return (req, res, next) => {
		Playlists.find({ creator: req.session.userid }, (error, playlists) => {
			if (error) {
				return next(error);
			}

			res.locals.playlists = playlists;
			return next();
		});
	};
};
