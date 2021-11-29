const { Favorite } = require("../models/Favorite");
const { auth } = require("../middleware/auth");

//=================================
//             Favorite
//=================================
module.exports = (app) => {
    app.post("/api/favorite/favoriteNumber", (req, res) => {
        Favorite.find({"movieId": req.body.movieId})
            .exec((err, subscribe) => {
                if (err) return res.status(400).send(err)

                res.status(200).json({success: true, subscribeNumber: subscribe.length})
            })
    });


    app.post("/api/favorite/favorited", (req, res) => {
        Favorite.find({"movieId": req.body.movieId, "userFrom": req.body.userFrom})
            .exec((err, subscribe) => {
                if (err) return res.status(400).send(err)
                let result = false;
                if (subscribe.length !== 0) {
                    result = true
                }
                res.status(200).json({success: true, subcribed: result})
            })
    });


    app.post("/api/favorite/addToFavorite", (req, res) => {
        console.log(req.body)
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
        //Need to find all of the users that I am subscribing to from subscriber collection
        Favorite.find({'userFrom': req.body.userFrom})
            .exec((err, favorites) => {
                if (err) return res.status(400).send(err);
                return res.status(200).json({success: true, favorites})
            })
    });
}