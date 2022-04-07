module.exports = (obj) => {
	const Song = obj.SongModel;

	return (req, res, next) => {
		if (
			typeof req.body.s_name === "undefined" ||
			typeof req.body.ar_name === "undefined" ||
			typeof req.body.genre === "undefined"
		) {
			return next();
		}
		if (typeof res.locals.song === "undefined") {
			res.locals.song = new Song();
		}
		req.res.locals.song.name = req.body.s_name;
		res.locals.song.artist = req.body.ar_name;
		res.locals.song.genre = req.body.genre;
		res.locals.song._pl = res.locals.playlist._id;

		res.locals.song.save((error) => {
			if (error) {
				return next(error);
			}

			return res.redirect(`/playlist/${res.locals.playlist._id}`);
		});
	};
};
