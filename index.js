const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(express.static("static"));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get("/", (req, res, next) => {
	return res.sendFile(__dirname + "/static/main.html");
});

app.post(
	"/",
	(req, res, next) => {
		if (typeof req.body.usr !== "undefined") {
			console.log(req.body.usr);
			console.log(req.body.psswrd);
			return next();
		}
	},
	(req, res, next) => {
		return res.redirect("/playlists");
	}
);

app.get("/playlists", (req, res, next) => {
	return res.sendFile(__dirname + "/static/playlists.html");
});

app.get("/artists", (req, res, next) => {
	return res.send("<h1/>Artists");
});

app.get("/registration", (req, res, next) => {
	return res.send("<h1/>Registration");
});

app.get("/new_playlist", (req, res, next) => {
	return res.sendFile(__dirname + "/static/newplaylist.html");
});

app.listen(3000, () => {
	console.log("Online on port 3000!");
});
