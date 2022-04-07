const db = require("../config/db");

const PlaylistModel = db.model("Playlist", {
	creator: String,
	name: String,
	date: String,
});

module.exports = PlaylistModel;
