const db = require("../config/db");

const SongModel = db.model("Song", {
	artist: String,
	name: String,
	genre: String,
	_pl: {
		type: db.Schema.Types.ObjectId,
		ref: "Playlist",
	},
	_ar: {
		type: db.Schema.Types.ObjectId,
		ref: "Artist",
	},
});

module.exports = SongModel;
