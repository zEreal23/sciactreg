const express = require('express');
const router = express.Router();

const { create, actById, read, remove, update, list, listRelated, listCategories, listTodayAct, listMonthAct, addUsers ,listBySearch, listSearch } = require('../controllers/activity');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');


router.get("/activity/:actId", read)
router.post("/activity/create/:userId", requireSignin, isAuth, isAdmin, create);
router.delete("/activity/:actId/:userId", requireSignin, isAuth, isAdmin, remove);
router.put("/activity/:actId/:userId", requireSignin, isAuth, isAdmin, update);

router.put('/activity/users',requireSignin, addUsers )

router.get("/activity/registration/:actId/:userId", requireSignin, isAuth, read)

router.post("/activities/by/search", listBySearch);

router.get("/activities/today", listTodayAct);
router.get("/activities/search", listSearch);
router.get("/activities/month", listMonthAct);
router.get("/activities", list);
router.get("/activities/related/:actId", listRelated);
router.get("/activities/categories", listCategories);

router.param("userId", userById);
router.param("actId", actById);

module.exports = router; 