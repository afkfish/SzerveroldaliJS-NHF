/**
 * megnezi hogy a session letezik e es ha nem akkor vissza dob a bejelentkezesre
 */
module.exports = () => {
	return (req, res, next) => {
		if (req.session.userid) {
			return next();
		}
		return res.redirect("/");
	};
};
