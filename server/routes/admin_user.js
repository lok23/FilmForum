const { AdminUser } = require("../models/AdminUser");


module.exports = (app) => {

    app.post("/api/admin_user/addCommentDeleted", (req, res) => {
        console.log("/api/admin_user/addCommentDeleted called");
        console.log("req.body: ", req.body);

        const adminUser = new AdminUser(req.body);
        adminUser.save((err, doc) => {
            if (err) return res.json({success: false, err})
            return res.status(200).json({success: true})
        })
    });

    app.post("/api/admin_user/getCommentsDeleted", (req, res) => {
        console.log("/api/admin_user/getCommentsDeleted called");
        console.log("req.body: ", req.body);
        // find user
        AdminUser.find({"userFrom": req.body.userFrom})
            .exec((err, result) => {
                if (err) return res.status(400).send(err)
                return res.status(200).json({success: true, result})
            })
    });
}