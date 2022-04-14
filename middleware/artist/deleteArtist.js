module.exports = (obj) => {
	const Artists = obj.ArtistModel;
	const Songs = obj.SongModel;
	return (req, res, next) => {
		Artists.deleteOne({ _id: req.params.aid })
			.then(() => {
				Songs.deleteMany({ _ar: req.params.aid }).then(() => {
					return res.redirect("/artists");
				});
			})
			.catch((error) => {
				return next(error);
			});
	};
};
