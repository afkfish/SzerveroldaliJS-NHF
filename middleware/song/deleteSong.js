module.exports = (obj) => {
	const Songs = obj.SongModel;
	return (req, res, next) => {
		if (typeof req.params.pid !== "undefined") {
			Songs.deleteOne({ _id: req.params.sid, _pl: req.params.pid })
				.then(() => {
					return res.redirect(`/playlist/${req.params.pid}`);
				})
				.catch((error) => {
					return next(error);
				});
		} else if (typeof req.params.aid !== "undefined") {
			Songs.deleteOne({ _id: req.params.sid, _ar: req.params.aid })
				.then(() => {
					return res.redirect(`/artist/${req.params.aid}`);
				})
				.catch((error) => {
					return next(error);
				});
		}
	};
};
