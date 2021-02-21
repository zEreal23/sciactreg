const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signin token
const expressJwt = require('express-jwt'); // for authorization check
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.signup = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

// use u_id to signin
exports.signin = (req, res) => {
    //find the user based on u_id
    const {u_id, password} = req.body;
    User.findOne({ u_id }, (err, user) => {
        //if err or no user
        if(err || !user) {
            return res.status(401).json({
                error: "User with that username does not exist. Plese Signin."
            });
        }
        //if user is found make sure the u_id and password match
        //create authenticate method in model and use here
        if(!user.authenticate(password)) {
            return res.status(401).json({
                error: "Username and password do not match"
            });
        }
        //generate a token with user id and secret
        const token = jwt.sign({ _id: user._id ,  role: user.role}, process.env.JWT_SECRET);
        //persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 });
        //return response with user and token to frontend client
        const {_id, u_id, fname, lname, major, email, role, status} = user;
        return res.json({ token, user: {_id, email, u_id, fname, lname, major, role, status}});
    });
};

exports.signout = (req, res) => {
    res.clearCookie("t");
    res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: "auth",
  });

exports.isAuth = (req, res, next) => {
    const isRequest = req.profile && req.auth
    if(!isRequest){
        return res.status(400).json({
            error: "Bad Request"
        });
    }
    console.log(typeof req.profile._id)
    console.log(typeof req.auth._id)
   const sameUser =  String(req.profile._id) === String(req.auth._id);
   const adminUser = req.auth.role === 1;

   if(!adminUser) {
       console.log(sameUser)
       if(!sameUser){
            return res.status(403).json({
                error: "Access denied"
            });
       }
   }
    /*if(!sameUser) { 
        return res.status(401).json({
            error: "User is not authorized"
        });
    }
    if(!adminUser)
    { 
        return res.status(403).json({
            error: "Access denied"
        });
    }*/
    next();
};

/*exports.hasAuthorization = (req, res, next) => {
    let sameUser = req.profile && req.auth && req.profile._id == req.auth._id;
    let adminUser = req.profile && req.auth && req.auth.role === 1;

    const authorizaed = sameUser || adminUser
    //console.log("Profile",req.profile)
    console.log("Auth",req.auth)
    console.log("Role ของคนที่ใช้อยู่",req.auth.role)

    //console.log("คนเดียวกัน",sameUser)
    //console.log("ผู้ดูแล",adminUser)

    if (!authorizaed) {
        return res.status(403).json({
            error: "User is not authorized to perform this action"
        });
    }
    next();
};*/

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json ({
            error: "Admin resourse! Access denied"
        });
    }
    next();
};