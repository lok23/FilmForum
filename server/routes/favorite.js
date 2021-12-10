const { Favorite } = require("../models/Favorite");
const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================
module.exports = (app) => {
    app.post("/api/favorite/favoriteNumber", (req, res) => {

        // Find Favorite information inside Favorite collection by movieID
        Favorite.find({"movieId": req.body.movieId})
            .exec((err, favorite) => {
                if (err) return res.status(400).send(err)

                res.status(200).json({success: true, favoriteNumber: favorite.length})
            })
    });

    app.post("/api/favorite/favoriteNumberTEST", (req, res) => {

        // Find Favorite information inside Favorite collection by movieID
        Favorite.find({"movieId": req.body.movieId})
            // could probably use .poopulate('userFrom') instead, but I'm too lazy to recreate mongodb collections
            .populate({
                path: 'userFrom',
                model: 'User'
            })
            .exec((err, favorite) => {
                if (err) return res.status(400).send(err)

                res.status(200).json({success: true, favorite: favorite})
            })
    });


    app.post("/api/favorite/favorited", (req, res) => {

        // Find Favorite information inside Favorite collection using movieId and userFrom
        Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
            .exec((err, favorite) => {
                if (err) return res.status(400).send(err)
                let result = false;

                // If I've already favorited this movie, I will have one object inside favorite
                if (favorite.length !== 0) {
                    result = true
                }
                res.status(200).json({success: true, favorited: result})
            })
    });


    app.post("/api/favorite/addToFavorite", (req, res) => {
        console.log(req.body)

        // We need to save information of the favoriteSchema (ie userFrom, movieID, etc)
        // Look at /server/models/Favorite.js if you are confused
        const favorite = new Favorite(req.body);
        favorite.save((err, doc) => {
            if (err) return res.json({success: false, err})
            return res.status(200).json({success: true})
        })
    });


    app.post("/api/favorite/removeFromFavorite", (req, res) => {
        Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
            .exec((err, doc) => {
                if (err) return res.status(400).json({success: false, err});
                res.status(200).json({success: true, doc})
            })
    });


    app.post("/api/favorite/getFavoredMovie", (req, res) => {
        // Get all movies which this guy has favorited
        Favorite.find({'userFrom': req.body.userFrom})
            .exec((err, favorites) => {
                if (err) return res.status(400).send(err);
                return res.status(200).json({success: true, favorites})
            })
    });
}