const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const {PremiumUser} = require("../models/PremiumUser");
const {AdminUser} = require("../models/AdminUser");

//=================================
//             Users
//=================================
module.exports = (app) => {
    app.get("/api/users/auth", auth, (req, res) => {
        res.status(200).json({
            _id: req.user._id,
            isAdmin: req.user.role === 0 ? false : true, // not needed
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            image: req.user.image,
        });
    });

    app.get("/api/users/allUsers", (req, res) => {
        console.log(User.find())
        User.find({}).then(function (users) {
            res.send(users);
        });
    });

    // this returns a lot of information, maybe it should return only the important parts?
    app.get("/api/users/peepee/:profileIDByName", (req, res) => {
        // console.log("1st: ", User.find({email: "admin@gmail.com"}))
        // console.log("2nd: ", User.find({email: req.params.profileIDByEmail}))
        console.log (req.params.profileIDByName)
        User.findOne({name: req.params.profileIDByName}, (err, doc) => {
            if (err) return res.json({success: false, err});
            console.log("3rd: ", doc)
            res.json(doc)
        })
    });

    app.post("/api/users/register", (req, res) => {

        // const user = new User(req.body);
        // console.log("register req.body: ", req.body);
        // user.save((err, doc) => {
        //     if (err) console.log("user save failed, or was not premiumUser")
        //     else console.log("user saved")
        // });
        //

        const user = new User(req.body);

        if (req.body.role === '1') {
            const premiumUser = new PremiumUser({'userFrom': user});
            console.log("register premiumUser req.body: ", req.body);
            premiumUser.save((err, doc) => {
                if (err) console.log("premiumUser save failed, or was not premiumUser")
                else console.log("premiumUser saved")
            });
        }

        if (req.body.role === '2') {
            const adminUser = new AdminUser({'userFrom': user});
            console.log("register adminUser req.body: ", req.body);
            adminUser.save((err, doc) => {
                if (err) console.log("adminUser save failed, or was not adminUser")
                else console.log("adminUser saved")
            });
        }

        console.log("register req.body: ", req.body);
        user.save((err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).json({
                success: true
            });
        });
    });

    app.post("/api/users/saveProfile", auth, (req, res) => {
        User.findOneAndUpdate({_id: req.body._id}, {name: req.body.name},  (err, doc) => {
            console.log(req.user)
            console.log(req.body)
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            });
        });
    });

    app.post("/api/users/login", (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (!user)
                return res.json({
                    loginSuccess: false,
                    message: "Auth failed, email not found"
                });

            user.comparePassword(req.body.password, (err, isMatch) => {
                if (!isMatch)
                    return res.json({loginSuccess: false, message: "Wrong password"});

                user.generateToken((err, user) => {
                    if (err) return res.status(400).send(err);
                    res.cookie("w_authExp", user.tokenExp);
                    res
                        .cookie("w_auth", user.token)
                        .status(200)
                        .json({
                            loginSuccess: true, userId: user._id
                        });
                });
            });
        });
    });

    app.get("/api/users/logout", auth, (req, res) => {
        console.log("req: ", req)
        console.log("req.user: ", req.user)
        console.log("req.user._id: ", req.user._id)
        User.findOneAndUpdate({_id: req.user._id}, {token: "", tokenExp: ""}, (err, doc) => {
            if (err) return res.json({success: false, err});
            return res.status(200).send({
                success: true
            });
        });
    });

}