const db = require("../config/db");

const ArtistModel = db.model("Artist", {
	name: String,
	ml: Number,
});

module.exports = ArtistModel;
