const render_mw = require("../middleware/render");
const c_time = require("../middleware/ctime");
const auth = require("../middleware/auth");
const check_pw = require("../middleware/checkpw");
const get_artists = require("../middleware/getArtists");
const get_artist = require("../middleware/getArtist");
const get_song = require("../middleware/getSong");
const get_playlists = require("../middleware/getPlaylists");
const get_playlist = require("../middleware/getPlaylist");
const logout = require("../middleware/logout");
const theme = require("../middleware/theme");

module.exports = function (app) {
	const obj = {
		playlist_m: {},
	};

	app.get("/playlists", theme(), auth(), get_playlists(), render_mw("playlists"));
	app.get("/playlist/:id", theme(), auth(), get_playlist(), render_mw("playlist"));
	app.use("/new/playlist", theme(), auth(), render_mw("new_playlist"));
	app.use(
		"/edit/playlist/:id",
		theme(),
		auth(),
		get_playlist(),
		render_mw("new_playlist")
	);

	app.get("/artists", theme(), auth(), get_artists(), render_mw("artists"));
	app.get("/artist/:id", theme(), auth(), get_artist(), render_mw("artist"));
	app.use("/new/artist", theme(), auth(), render_mw("new_artist"));
	app.use("/edit/artist/:id", theme(), auth(), get_artist(), render_mw("new_artist"));

	app.use("/new/song", theme(), auth(), render_mw("new_song"));
	app.use("/edit/song/:id", theme(), auth(), get_song(), render_mw("new_song"));

	app.use("/registration", theme(), render_mw("registration"));
	app.use("/logout", theme(), logout());

	app.use("/theme/light", theme("toggle"));
	app.use("/theme/dark", theme("toggle"));

	app.use("/", theme(), check_pw(), render_mw("main"));
};
