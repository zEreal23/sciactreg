const User = require('../models/user');
const formidable = require('formidable');
const { result } = require('lodash');

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

exports.update = (req, res) => {
    const { fname, lname ,password } = req.body;

    User.findOne({ _id: req.profile._id }, (err, user) => {
        if(err || !user ) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (!fname) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.fname = fname;
        }

        if (!lname) {
            return res.status(400).json({
                error: 'Name is required'
            });
        } else {
            user.lname = lname;
        }
        
        if(password) {
            if(password.lenght < 6) {
                return res.status(400).json({
                    error: 'Password should be min 6 characters long'
                });
            } else {
                user.password = password
                console.log(user.password)
            }
        }

        user.save((err, updatedUser) => {
            if(err) {
                console.log('USER UPDATE ERROR', err)
                return res.status(400).json({
                    error: 'User update failed'
                })
            }
            updatedUser.hashed_password = undefined
            updatedUser.salt = undefined
            res.json(updatedUser)
            console.log(updatedUser)
        })
    })
}

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

