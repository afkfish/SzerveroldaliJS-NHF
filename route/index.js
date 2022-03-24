const rendermw = require("../middleware/render");
const ctime = require("../middleware/ctime");
const auth = require("../middleware/auth");
const checkpw = require("../middleware/checkpw");
const getartists = require("../middleware/getArtists");
const getartist = require("../middleware/getArtist");
const getsong = require("../middleware/getSong");
const getplaylists = require("../middleware/getPlaylists");
const getplaylist = require("../middleware/getPlaylist");

module.exports = function (app) {
	const obj = {
		playlist_m: {},
	};

	app.get("/playlists", auth(), getplaylists(), rendermw("playlists"));
	app.get("/playlist/:id", auth(), getplaylist(), rendermw("playlist"));
	app.use("/new/playlist", auth(), rendermw("newplaylist"));
	app.use(
		"/edit/playlist/:id",
		auth(),
		getplaylist(),
		rendermw("newplaylist")
	);

	app.get("/artists", auth(), getartists(), rendermw("artists"));
	app.get("/artist/:id", auth(), getartist(), rendermw("artist"));
	app.use("/new/artist", auth(), rendermw("newartist"));
	app.use("/edit/artist/:id", auth(), getartist(), rendermw("newartist"));

	app.use("/new/song", auth(), rendermw("newsong"));
	app.use("/edit/song/:id", auth(), getsong(), rendermw("newsong"));

	app.use("/registration", rendermw("registration"));

	app.use("/", checkpw(), rendermw("main"));
};
