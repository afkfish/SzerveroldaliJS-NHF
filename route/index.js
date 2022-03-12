const rendermw = require("../middleware/render");
const ctime = require("../middleware/ctime");
const auth = require("../middleware/auth");

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

	app.get("/playlists", auth(), rendermw("playlists"));

	app.get("/playlist/:id", auth(), rendermw("playlist"));

	app.get("/artists", auth(), rendermw("artists"));

	app.get("/artist/:id", auth(), rendermw("artist"));

	app.get("/new/song", auth(), rendermw("newsong"));

	app.post(
		"/new/song",
		(req, res, next) => {
			if (typeof req.body.s_name !== "undefined") {
				console.log(req.body.s_name);
				console.log(req.body.ar_name);
				console.log(req.body.genre);
				return next();
			}
		},
		(req, res, next) => {
			return res.redirect("/playlist/alma");
		}
	);

	app.get("/registration", rendermw("registration"));

	app.post(
		"/registration",
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

	app.get("/new/playlist", auth(), rendermw("newplaylist"));

	app.post(
		"/new/playlist",
		auth(),
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

	app.get("/new/artist", auth(), rendermw("newartist"));

	app.post(
		"/new/artist",
		auth(),
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
