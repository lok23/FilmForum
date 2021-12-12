const { PremiumUser } = require("../models/PremiumUser");
const {User} = require("../models/User");
const {Favorite} = require("../models/Favorite");

module.exports = (app) => {

    app.post("/api/premium_user/addTrailerClick", (req, res) => {
        console.log("/api/premium_user/addTrailerClick called");
        console.log("req.body: ", req.body);
        // find user
        //
        // const trailersClicked = PremiumUser.find({"userFrom": req.body.userFrom});
        //
        // console.log("trailersClicked: ", trailersClicked);
        //
        // PremiumUser.findOneAndUpdate({"userFrom": req.body.userFrom}, {"trailersClicked": req.body.trailersClicked})
        //     .exec((err, result) => {
        //         if (err) return res.status(400).send(err)
        //         return res.status(200).json({success: true, result})
        //     })

        const premiumUser = new PremiumUser(req.body);
        premiumUser.save((err, doc) => {
            if (err) return res.json({success: false, err})
            return res.status(200).json({success: true})
        })
    });

    app.post("/api/premium_user/getTrailersClick", (req, res) => {
        console.log("/api/premium_user/getTrailersClick called");
        console.log("req.body: ", req.body);
        // find user
        PremiumUser.find({"userFrom": req.body.userFrom})
            .exec((err, result) => {
                if (err) return res.status(400).send(err)
                return res.status(200).json({success: true, result})
            })
    });
}