module.exports = (obj) => {
	const Playlists = obj.PlaylistModel;
	const Songs = obj.SongModel;
	return (req, res, next) => {
		Playlists.deleteOne({ _id: req.params.pid })
			.then(() => {
				Songs.deleteMany({ _pl: req.params.pid }).then(() => {
					return res.redirect("/playlists");
				});
			})
			.catch((error) => {
				return next(error);
			});
	};
};
