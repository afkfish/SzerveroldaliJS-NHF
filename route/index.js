const render_mw = require("../middleware/render");
const auth = require("../middleware/auth");
const check_pw = require("../middleware/checkpw");
const register = require("../middleware/register");
const get_artists = require("../middleware/getArtists");
const get_artist = require("../middleware/getArtist");
const get_song = require("../middleware/getSong");
const get_songs = require("../middleware/getSongs");
const save_song = require("../middleware/saveSong");
const get_playlists = require("../middleware/getPlaylists");
const get_playlist = require("../middleware/getPlaylist");
const save_playlist = require("../middleware/savePlaylist");
const logout = require("../middleware/logout");
const theme = require("../middleware/theme");

const bcrypt = require("bcrypt");

const PlaylistModel = require("../models/playlists");
const SongModel = require("../models/songs");

module.exports = function (app) {
	const obj = {
		PlaylistModel: PlaylistModel,
		SongModel: SongModel,
	};

	app.get("/playlists", theme(), auth(), get_playlists(obj), render_mw(obj, "playlists"));
	app.get("/playlist/:pid", theme(), auth(), get_playlist(obj), get_songs(obj), render_mw(obj, "playlist"));
	app.use("/new/playlist", theme(), auth(), save_playlist(obj), render_mw(obj, "new_playlist"));
	app.use(
		"/edit/playlist/:pid",
		theme(),
		auth(),
		get_playlist(obj),
		save_playlist(obj),
		render_mw(obj, "new_playlist")
	);

	app.get("/artists", theme(), auth(), get_artists(), render_mw(obj, "artists"));
	app.get("/artist/:aid", theme(), auth(), get_artist(), get_songs(obj), render_mw(obj, "artist"));
	app.use("/new/artist", theme(), auth(), render_mw("new_artist"));
	app.use("/edit/artist/:aid", theme(), auth(), get_artist(), render_mw(obj, "new_artist"));

	app.use(
		"/new/song/playlist/:pid",
		theme(),
		auth(),
		get_playlist(obj),
		save_song(obj),
		render_mw(obj, "new_song")
	);
	app.use(
		"/edit/song/:sid/playlist/:pid",
		theme(),
		auth(),
		get_playlist(obj),
		get_song(obj),
		save_song(obj),
		render_mw(obj, "new_song")
	);

	app.use("/registration", theme(), register(), render_mw(obj, "registration"));
	app.use("/logout", theme(), logout());

	app.use("/theme/toggle", theme("toggle"));

	app.use("/", theme(), check_pw(bcrypt), render_mw(obj, "main"));
};
