const render_mw = require("../middleware/render");
const auth = require("../middleware/user_actions/auth");
const check_pw = require("../middleware/user_actions/checkpw");
const register = require("../middleware/user_actions/register");
const get_artists = require("../middleware/artist/getArtists");
const get_artist = require("../middleware/artist/getArtist");
const get_song = require("../middleware/song/getSong");
const get_songs = require("../middleware/song/getSongs");
const save_song = require("../middleware/song/saveSong");
const delete_song = require("../middleware/song/deleteSong");
const get_playlists = require("../middleware/playlist/getPlaylists");
const get_playlist = require("../middleware/playlist/getPlaylist");
const save_playlist = require("../middleware/playlist/savePlaylist");
const delete_playlist = require("../middleware/playlist/deletePlaylist");
const save_artist = require("../middleware/artist/saveArtist");
const delete_artist = require("../middleware/artist/deleteArtist");
const logout = require("../middleware/user_actions/logout");
const theme = require("../middleware/theme");

const bcrypt = require("bcrypt");

const PlaylistModel = require("../models/playlists");
const SongModel = require("../models/songs");
const ArtistModel = require("../models/artists");

module.exports = function (app) {
	const obj = {
		PlaylistModel: PlaylistModel,
		SongModel: SongModel,
		ArtistModel: ArtistModel,
	};

	app.get(
		"/playlists",
		theme(),
		auth(),
		get_playlists(obj),
		render_mw(obj, "playlists")
	);
	app.get(
		"/playlist/:pid",
		theme(),
		auth(),
		get_playlist(obj),
		get_songs(obj, "pl"),
		render_mw(obj, "playlist")
	);
	app.use(
		"/new/playlist",
		theme(),
		auth(),
		save_playlist(obj),
		render_mw(obj, "new_playlist")
	);
	app.use(
		"/edit/playlist/:pid",
		theme(),
		auth(),
		get_playlist(obj),
		save_playlist(obj),
		render_mw(obj, "new_playlist")
	);
	app.use("/delete/playlist/:pid", auth(), delete_playlist(obj));

	app.get(
		"/artists",
		theme(),
		auth(),
		get_artists(obj),
		render_mw(obj, "artists")
	);
	app.get(
		"/artist/:aid",
		theme(),
		auth(),
		get_artist(obj),
		get_songs(obj, "ar"),
		render_mw(obj, "artist")
	);
	app.use(
		"/new/artist",
		theme(),
		auth(),
		save_artist(obj),
		render_mw(obj, "new_artist")
	);
	app.use(
		"/edit/artist/:aid",
		theme(),
		auth(),
		get_artist(obj),
		save_artist(obj),
		render_mw(obj, "new_artist")
	);
	app.use("/delete/artist/:aid", auth(), delete_artist(obj));

	app.use(
		"/new/song/playlist/:pid",
		theme(),
		auth(),
		get_playlist(obj),
		save_song(obj, "pl"),
		render_mw(obj, "new_song")
	);
	app.use(
		"/new/song/artist/:aid",
		theme(),
		auth(),
		get_artist(obj),
		save_song(obj, "ar"),
		render_mw(obj, "new_song")
	);
	app.use(
		"/edit/song/:sid/playlist/:pid",
		theme(),
		auth(),
		get_playlist(obj),
		get_song(obj),
		save_song(obj, "pl"),
		render_mw(obj, "new_song")
	);
	app.use(
		"/edit/song/:sid/artist/:aid",
		theme(),
		auth(),
		get_artist(obj),
		get_song(obj),
		save_song(obj, "ar"),
		render_mw(obj, "new_song")
	);
	app.use("/delete/song/:sid/playlist/:pid", auth(), delete_song(obj));
	app.use("/delete/song/:sid/artist/:aid", auth(), delete_song(obj));

	app.use(
		"/registration",
		theme(),
		register(),
		render_mw(obj, "registration")
	);
	app.use("/logout", theme(), logout());

	app.use("/theme/toggle", theme("toggle"));

	app.use("/", theme(), check_pw(bcrypt), render_mw(obj, "main"));
};
