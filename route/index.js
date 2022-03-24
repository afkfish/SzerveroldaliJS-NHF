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

module.exports = function (app) {
	const obj = {
		playlist_m: {},
	};

	app.get("/playlists", auth(), get_playlists(), render_mw("playlists"));
	app.get("/playlist/:id", auth(), get_playlist(), render_mw("playlist"));
	app.use("/new/playlist", auth(), render_mw("new_playlist"));
	app.use("/edit/playlist/:id", auth(), get_playlist(), render_mw("new_playlist"));

	app.get("/artists", auth(), get_artists(), render_mw("artists"));
	app.get("/artist/:id", auth(), get_artist(), render_mw("artist"));
	app.use("/new/artist", auth(), render_mw("new_artist"));
	app.use("/edit/artist/:id", auth(), get_artist(), render_mw("new_artist"));

	app.use("/new/song", auth(), render_mw("new_song"));
	app.use("/edit/song/:id", auth(), get_song(), render_mw("new_song"));

	app.use("/registration", render_mw("registration"));
	app.use("/logout", logout());

	app.use("/", check_pw(), render_mw("main"));
};
