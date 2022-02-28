const express = require("express");
const app = express();
app.use(express.static(__dirname + "/templates"));

app.get("/", (req, res, next) => {
	return res.sendFile(__dirname + "/templates/main.html");
});

app.get("/playlists", (req, res, next) => {
	return res.sendFile(__dirname + "/templates/playlists.html");
});

app.get("/artists", (req, res, next) => {
	return res.send("<h1/>Artists");
});

app.get("/registration", (req, res, next) => {
	return res.send("<h1/>Registration");
});

app.listen(3000, () => {
	console.log("Online on port 3000!");
});
