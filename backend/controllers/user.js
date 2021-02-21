const User = require('../models/user');

exports.userById = (req, res, next, id) => {
    User.findById(id)
    // populate registered of user array
    .exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "User not found"
            });
        }
        req.profile = user;
        next();
    });
};

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};

/*exports.update = (req, res) => {
    User.findOneAndUpdate({ _id: req.profile._id }, {$set: req.body}, {new: true}, (err, user) => {
        if(err) {
            return res.status(400).json({
                error: "You are not authorized to perform this action"
            });
        }
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        res.json(user);
    });
};*/

exports.update = async(req, res) => {
    const { fname, lname ,password } = req.body;
    if(!fname||!lname) {
        return res.status(400).json({
            error: 'Bad Request'
        });
    }
    
   const data = await User.findOneAndUpdate({ _id: req.profile._id }, {$set:{fname:fname , lname:lname}})
    console.log(data)
    return res.status(200).json(data)
}

exports.remove = (req, res) => {
    const user = req.profile;
    user.remove((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: "User deleted"
        });
    });
};

exports.list = (req, res) => {
    User.find().exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

// activities of user

exports.addActivity = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId, 
        {$push: {registered: req.body.registeredId}}
    )
    .exec((err, result) => {
        if(err) {
            return res.status(400).json({error: err});
        }
        next();
    })
};

