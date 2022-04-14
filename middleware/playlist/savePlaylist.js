module.exports = (obj) => {
	const Playlist = obj.PlaylistModel;
	const ctime = require("../ctime");
	return (req, res, next) => {
		if (typeof req.body.pl_name === "undefined") {
			return next();
		}

		if (typeof res.locals.playlist === "undefined") {
			res.locals.playlist = new Playlist();
			res.locals.playlist.date = ctime();
		}
		res.locals.playlist.name = req.body.pl_name;
		res.locals.playlist.creator = req.session.userid;

		res.locals.playlist.save((error) => {
			if (error) {
				return next(error);
			}

			return res.redirect("/playlists");
		});
	};
};
