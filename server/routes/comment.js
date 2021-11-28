const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");


router.post("/saveComment", auth, (req, res) => {

    console.log(req.body);
    const comment = new Comment(req.body)

    // Mongoose save and create are similar methods
    comment.save((err, comment) => {
        console.log(err)
        if (err) return res.json({ success: false, err })

        Comment.find({ '_id': comment._id })
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({ success: false, err })
                return res.status(200).json({ success: true, result })
            })
    })
})

// responseTo is the json key that contains the actual comment we want to "delete"
// (you can imagine its that way because instead of "respondingTo" a comment, we are "deleteing" it instead)
router.post("/deleteComment", auth, (req, res) => {

    console.log(req.body);
    const theCommentID = req.body.responseTo
    console.log(theCommentID)
    Comment.findByIdAndUpdate({'_id': theCommentID}, {content: "COMMENT DELETED BY ADMIN"}, (err, comment) => {
        console.log("REEEEEEEEEEEE");
        if (err) return res.json({ success: false, err })
        return res.status(200).json({ success: true, comment })
    })

})

router.post("/getComments", (req, res) => {

    Comment.find({ "postId": req.body.movieId })
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, comments })
        })
});

module.exports = router;
