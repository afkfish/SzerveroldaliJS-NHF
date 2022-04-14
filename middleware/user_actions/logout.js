/**
 * lezarja a sessiont es redirectel a main oldalra ahol ujra be kell jelentkezni
 */
module.exports = () => {
	return (req, res, next) => {
		req.session.destroy();
		res.redirect("/");
	};
};
