module.exports = (obj, mode) => {
	const Song = obj.SongModel;
	return (req, res, next) => {
		if (
			typeof req.body.s_name === "undefined" ||
			typeof req.body.genre === "undefined"
		) {
			return next();
		}
		if (typeof res.locals.song === "undefined") {
			res.locals.song = new Song();
		}
		req.res.locals.song.name = req.body.s_name;
		if (
			typeof req.body.ar_name === "undefined" &&
			res.locals.artist.name !== "undefined"
		) {
			res.locals.song.artist = res.locals.artist.name;
		} else {
			res.locals.song.artist = req.body.ar_name;
		}
		res.locals.song.genre = req.body.genre;
		if (mode === "pl") {
			res.locals.song._pl = res.locals.playlist._id;
		} else if (mode === "ar") {
			res.locals.song._ar = res.locals.artist._id;
		}

		res.locals.song.save((error) => {
			if (error) {
				return next(error);
			}
			if (mode === "pl") {
				return res.redirect(`/playlist/${res.locals.playlist._id}`);
			} else if (mode === "ar") {
				return res.redirect(`/artist/${res.locals.artist._id}`);
			}
		});
	};
};
