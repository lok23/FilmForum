const { Like } = require("../models/Like");
const { Dislike } = require("../models/Dislike");

const { auth } = require("../middleware/auth");

//=================================
//             Likes DisLikes
//=================================
module.exports = (app) => {
    app.post("/api/like/getLikes", (req, res) => {

        let variable = {}
        if (req.body.videoId) {
            variable = {videoId: req.body.videoId}
        } else {
            variable = {commentId: req.body.commentId}
        }

        console.log("getLikes variable: ", variable);

        Like.find(variable)
            // .populate('userId') // do not use .populate here it will break stuff!!!
            .exec((err, likes) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({success: true, likes})
            })
    })


    app.post("/api/like/getDislikes", (req, res) => {

        let variable = {}
        if (req.body.videoId) {
            variable = {videoId: req.body.videoId}
        } else {
            variable = {commentId: req.body.commentId}
        }

        Dislike.find(variable)
            .exec((err, dislikes) => {
                if (err) return res.status(400).send(err);
                res.status(200).json({success: true, dislikes})
            })
    })


    app.post("/api/like/upLike", (req, res) => {

        let variable = {}
        if (req.body.videoId) {
            variable = {videoId: req.body.videoId, userId: req.body.userId}
        } else {
            variable = {commentId: req.body.commentId, userId: req.body.userId}
        }

        const like = new Like(variable)
        //save the like information data in MongoDB
        like.save((err, likeResult) => {
            if (err) return res.json({success: false, err});
            //In case disLike Button is already clicked, we need to decrease the dislike by 1
            Dislike.findOneAndDelete(variable)
                .exec((err, disLikeResult) => {
                    if (err) return res.status(400).json({success: false, err});
                    res.status(200).json({success: true})
                })
        })
    })


    app.post("/api/like/unLike", (req, res) => {

        let variable = {}
        if (req.body.videoId) {
            variable = {videoId: req.body.videoId, userId: req.body.userId}
        } else {
            variable = {commentId: req.body.commentId, userId: req.body.userId}
        }

        Like.findOneAndDelete(variable)
            .exec((err, result) => {
                if (err) return res.status(400).json({success: false, err})
                res.status(200).json({success: true})
            })
    })


    app.post("/api/like/unDisLike", (req, res) => {

        let variable = {}
        if (req.body.videoId) {
            variable = {videoId: req.body.videoId, userId: req.body.userId}
        } else {
            variable = {commentId: req.body.commentId, userId: req.body.userId}
        }

        Dislike.findOneAndDelete(variable)
            .exec((err, result) => {
                if (err) return res.status(400).json({success: false, err})
                res.status(200).json({success: true})
            })
    })


    app.post("/api/like/upDisLike", (req, res) => {

        let variable = {}
        if (req.body.videoId) {
            variable = {videoId: req.body.videoId, userId: req.body.userId}
        } else {
            variable = {commentId: req.body.commentId, userId: req.body.userId}
        }

        const disLike = new Dislike(variable)
        //save the like information data in MongoDB
        disLike.save((err, dislikeResult) => {
            if (err) return res.json({success: false, err});
            //In case Like Button is already clicked, we need to decrease the like by 1
            Like.findOneAndDelete(variable)
                .exec((err, likeResult) => {
                    if (err) return res.status(400).json({success: false, err});
                    res.status(200).json({success: true})
                })
        })
    })
}
