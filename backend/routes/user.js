const express = require('express');
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, read, update, list, addActivity , remove } = require('../controllers/user');

router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.get("/users" , list);
router.get("/user/:userId", requireSignin, isAuth, read);
router.put("/user/:userId", requireSignin , isAuth  , update);
router.delete("/user/:userId",requireSignin, isAuth, remove);

router.put('/user/activities',requireSignin, addActivity )

router.param("userId", userById);


module.exports = router;