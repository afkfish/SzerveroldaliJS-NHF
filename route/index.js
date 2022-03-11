const rendermw = require("../middleware/render");
const ctime = require("../middleware/ctime");

module.exports = function (app) {
	const obj = {
		playlist_m: {},
	};
	app.get("/", rendermw("main"));

	app.post(
		"/",
		(req, res, next) => {
			if (typeof req.body.usr !== "undefined") {
				console.log(req.body.usr);
				console.log(req.body.psswrd);
				return next();
			}
		},
		(req, res, next) => {
			return res.redirect("/playlists");
		}
	);

	app.get("/playlists", rendermw("playlists"));

	app.get("/playlist/:id", rendermw("playlist"));

	app.get("/artists", rendermw("artists"));

	app.get("/artist/:id", rendermw("artist"));

	app.get("/new/song", rendermw("newsong"));

	app.get("/register", rendermw("registration")); /////////////

	app.get("/new/playlist", rendermw("newplaylist"));

	app.post(
		"/new/playlist",
		(req, res, next) => {
			if (typeof req.body.pl_name !== "undefined") {
				console.log(req.body.pl_name);
				ctime();
				next();
			}
		},
		(req, res, next) => {
			return res.redirect("/playlists");
		}
	);

	app.get("/new/artist", rendermw("newartist"));

	app.post(
		"/new/artist",
		(req, res, next) => {
			if (typeof req.body.ar_name !== "undefined") {
				console.log(req.body.ar_name);
				if (typeof req.body.m_lis !== "undefined") {
					console.log(req.body.m_lis);
				}
				ctime();
				next();
			}
		},
		(req, res, next) => {
			return res.redirect("/artists");
		}
	);
};
