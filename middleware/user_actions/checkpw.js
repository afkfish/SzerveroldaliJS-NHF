/**
 * megnezi hogy a beirt felhasznalonev es jelszo helyes e, egyenlore ezek fixek de kesobb majd lehet regisztralni
 * es akkor egy adatbazisbol fogja lekerdezni a helyes felhasznaloi adatokat.
 * ha nem heyes akkor vissza iranyit a login pagere de egy hibaval
 */
module.exports = (bcrypt) => {
	const Users = require("../../models/users");
	return (req, res, next) => {
		if (
			typeof req.body.username === "undefined" ||
			typeof req.body.password === "undefined"
		) {
			return next();
		}
		Users.findOne({ username: req.body.username }, (error, user) => {
			if (error || !user) {
				res.locals.error = "Wrong username or password!";
				return next();
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then(() => {
					req.session.userid = req.body.username;
					return res.redirect("/playlists");
				})
				.catch((error) => {
					res.locals.error = "Wrong username or password!";
					return next(error);
				});
		});
	};
};
