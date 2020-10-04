const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, read, update, list, addActivity } = require('../controllers/user');

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});


router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/update/:userId", requireSignin, isAuth, update);
router.get("/users", list);

router.put('/user/activities',requireSignin, addActivity )

router.param("userId", userById);


module.exports = router;