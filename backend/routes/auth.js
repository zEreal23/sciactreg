const express = require('express');
const router = express.Router();
const {userById} = require('../controllers/user');

const { signup, signin, signout, requireSignin, isAuth,isAdmin } = require('../controllers/auth');
const { userSignupValidator } = require('../validator');

router.post('/signup/:userId' ,userSignupValidator,  isAdmin, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.param('userId', userById);
module.exports = router;