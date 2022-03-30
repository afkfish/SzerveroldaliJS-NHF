const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded());
app.use("/assets", express.static("static"));
app.use(cookieParser());
app.use(
	session({
		secret: "AignmjiuhBmZLVW8jeh4",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false },
	})
);

require("./route/index")(app);

app.listen(3000, () => {
	console.log("Online on port 3000!");
});
