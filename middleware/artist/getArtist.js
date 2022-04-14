/**
 * az adatbazisbol lekerdezi egy eloado szamait nevet es havi hallgatoinak szamat
 */
module.exports = (obj) => {
	const Artist = obj.ArtistModel;
	return (req, res, next) => {
		Artist.findOne({ user: req.session.userid, _id: req.params.aid }, (error, artist) => {
			if (error) {
				return next(error);
			}
			res.locals.artist = artist;
			return next();
		});
	};
};
