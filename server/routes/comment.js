const { Comment } = require("../models/Comment");
const { auth } = require("../middleware/auth");


// populate writer aka user. We need to retrieve user's name so comments show up properly
module.exports = (app) => {
    app.post("/api/comment/saveComment", auth, (req, res) => {

        console.log(req.body);
        const comment = new Comment(req.body)

        // Mongoose save and create are similar methods
        comment.save((err, comment) => {
            console.log(err)
            if (err) return res.json({success: false, err})
            Comment.find({'_id': comment._id})
                .populate('writer')
                .exec((err, result) => {
                    if (err) return res.json({success: false, err})
                    return res.status(200).json({success: true, result})
                })
        })
    })

// responseTo is the json key that contains the actual comment we want to "delete"
// (you can imagine its that way because instead of "respondingTo" a comment, we are "deleteing" it instead)
    app.post("/api/comment/deleteComment", auth, (req, res) => {
        console.log(req.body);
        const theCommentID = req.body.responseTo
        console.log(theCommentID)
        Comment.findByIdAndUpdate({'_id': theCommentID}, {content: "COMMENT DELETED BY ADMIN", isDeleted: true}, (err, comment) => {
            console.log("REEEEEEEEEEEE");
            if (err) return res.json({success: false, err})
            return res.status(200).json({success: true, comment})
        })

    })

    app.post("/api/comment/getComments", (req, res) => {
        Comment.find({"postId": req.body.movieId})
            .populate('writer')
            .exec((err, comments) => {
                if (err) return res.status(400).send(err)
                res.status(200).json({success: true, comments})
            })
    });
}
