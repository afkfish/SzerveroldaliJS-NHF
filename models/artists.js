const db = require("../config/db");

const ArtistModel = db.model("Artist", {
	user: String,
	name: String,
	ml: Number,
});

module.exports = ArtistModel;
