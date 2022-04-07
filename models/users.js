const db = require("../config/db");

const UserModel = db.model("User", {
	username: String,
	password: String,
});

module.exports = UserModel;
