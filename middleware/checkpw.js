/**
 * megnezi hogy a beirt felhasznalonev es jelszo helyes e, egyenlore ezek fixek de kesobb majd lehet regisztralni
 * es akkor egy adatbazisbol fogja lekerdezni a helyes felhasznaloi adatokat.
 * ha nem heyes akkor vissza iranyit a login pagere de egy hibaval
 */
module.exports = () => {
	return (req, res, next) => {
		if (
			typeof req.body.username === "undefined" ||
			typeof req.body.password === "undefined"
		) {
			return next();
		} else if (req.body.username === "test" && req.body.password === "test") {
			req.session.userid = req.body.username;
			return res.redirect("/playlists");
		} else {
			res.locals.error = "Wrong username or password!";
		}
		return next();
	};
};
