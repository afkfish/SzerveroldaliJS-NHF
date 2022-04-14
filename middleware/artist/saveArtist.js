module.exports = (obj) => {
    const Artist = obj.ArtistModel;
    return (req, res, next) => {
        if(typeof req.body.name === "undefined" || typeof req.body.ml === "undefined"){
            return next();
        }
        if(typeof res.locals.artist === "undefined") {
            res.locals.artist = new Artist();
        }
        res.locals.artist.name = req.body.name;
        res.locals.artist.ml = req.body.ml;
        res.locals.artist.user = req.session.userid;

        res.locals.artist.save((error)=>{
            if(error) {
                return next(error);
            }

            return res.redirect("/artists");
        })

    }
}