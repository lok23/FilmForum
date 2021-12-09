const { RecentPages } = require("../models/RecentPages");
const { auth } = require("../middleware/auth");
const {Favorite} = require("../models/Favorite");

module.exports = (app) => {
    app.post("/api/recent_pages/saveRecentPage", (req, res) => {
        // find user
        // RecentPages.find({'userFrom': req.body.userFrom}, (err, user) => {
        //     if (!user) {
        //         return res.json({
        //             userExists: false,
        //             message: "User does not exist (or not logged in)"
        //         });
        //     }
        // })
        console.log("saveRecentPage req.body: ", req.body);
        const recentPage = new RecentPages(req.body)
        // Mongoose save and create are similar methods
        recentPage.save((err, recentPage) => {
            // console.log(err)
            if (err) return res.json({success: false, err})
            RecentPages.find({'_id': recentPage._id})
                .populate('userFrom')
                .exec((err, result) => {
                    if (err) return res.json({success: false, err})
                    return res.status(200).json({success: true, result})
                })
        })
    })

    app.post("/api/recent_pages/getRecentPages", (req, res) => {
        console.log("/api/recent_pages/getRecentPages called");
        console.log("req.body: ", req.body);
        // find user
        RecentPages.find({"userFrom": req.body.userFrom})
            .exec((err, result) => {
                if (err) return res.status(400).send(err)
                return res.status(200).json({success: true, result})
            })
    });
}