const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static("static"));

require("./route/index")(app);

app.listen(3000, () => {
	console.log("Online on port 3000!");
});
