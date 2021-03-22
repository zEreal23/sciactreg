const Act = require('../models/activity');
const User = require('../models/user');
const formidable = require('formidable');
const _ = require('lodash');
const { errorHandler } = require('../helpers/dbErrorHandler');
const moment = require('moment');
const user = require('../models/user');
const { result } = require('lodash');

exports.actById = (req, res, next, id) => {
    Act.findById(id)
        .populate('enrolluser', '_id fname lname major')
        .exec((err, act) => {
            if (err || !act) {
                return res.status(400).json({
                    error: "Activity not found"
                });
            }
            req.act = act;
            next();
        });
};

exports.read = (req, res) => {
    return res.json(req.act);
};

exports.remove = (req, res) => {
    let act = req.act;
    act.remove((err, deleteAct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            "message": "Activity delete successful"
        });
    });
};

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {
        const { name, description, date, time, hour, category } = fields;
        if (!name || !description || !date || !category || !time || !hour) {
            return res.status(400).json({
                error: "All fields are require"
            });
        }

        let activity = new Act(fields);

        activity.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result)
        });
    });
};

exports.update = (req, res) => {
    const activity = req.act;
    const { name, description, date, time, hour, category } = req.body;
    activity.name = name
    activity.description = description
    activity.date = date
    activity.time = time
    activity.hour = hour
    if(!category) {
        category === activity.category
        console.log(category)
    } else {
        activity.category = category
    }


    activity.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        console.log('updated',activity)
        res.json({ data })
    })
}
/*exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields) => {

        //check for all fields
        const { name, description, date, time, hour, category } = fields;

        if (!name || !description || !date || !category || !time || !hour) {
            return res.status(400).json({
                error: "All fields are require"
            });
        }


        let act = req.act;
        act = _.extend(act, fields);

        act.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result)
        });
    });
};*/

/**
 * New
 * by New = /activities?sortBy=createdAt&order=desc&limit=4
 */

exports.list = (req, res) => {

    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 12;

    Act.find()
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, acts) => {
            if (err) {
                return res.status(400).json({
                    error: "Activity not found"
                });
            }
            res.json(acts);
        });
};

/**
 * it will find the activities base on the req activity category
 * other activites that has the same category, will be returned
 */

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Act.find({ _id: { $ne: req.act }, category: req.act.category })
        .limit(limit)
        .populate("category", "_id: name")
        .exec((err, acts) => {
            if (err) {
                return res.status(400).json({
                    error: "Activity not found"
                });
            }
            res.json(acts);
        });

};

exports.listCategories = (req, res) => {
    Act.distinct("category", {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Categories not found"
            });
        }
        res.json(categories);
    })
};

/**
 * get today's activities 
 */

exports.listTodayAct = (req, res) => {

    var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
    Act.find({
        "date": new Date(today)
    })
        .exec((err, acts) => {
            if (err) {
                return res.status(400).json({
                    error: "Activity not found"
                });
            }
            res.json(acts);
        });
}

/**
* get month's activities 
*/

exports.listMonthAct = (req, res) => {
    var month = moment().format('M');
    Act.find({
        "date": {
            $gte: moment(`${month}`, 'M').format('M')
        }
    })
        .exec((err, acts) => {
            if (err) {
                return res.status(400).json({
                    error: "Activity not found"
                });
            }
            res.json(acts);
        });
}

// user rigister

exports.addUsers = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.registeredId,
        { $push: { participants: req.body.userId } },
        { new: true }
    )
        .populate('partacipants', '_id u_id')
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                })
            }
            result.hashed_password = undefined
            result.salt = undefined
            res.json(result)
        })
};

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (key === 'price') {
            findArgs[key] = {
                $gte: req.body.filters[key][0],
                $lte: req.body.filters[key][1]
            };
        } else {
            findArgs[key] = req.body.filters[key];
        }
    }

    Act.find(findArgs)
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Activity not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


exports.listSearch = (req, res) => {
    const query = {}
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' }
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category
        }
        Act.find(query, (err, acts) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json(acts)
        })
    }
}

exports.userenroll = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, { $push: { enrolling: req.body.actId } }, { new: true })
    .populate('enrolling', ' name')
    .exec((err, result) => {
        console.log('resgister',result)
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            res.json(result);
            console.log("ลงทะเบียน", result.enrolling)
        }
    });
};

exports.enroll = async (req, res) => {
    try {
        if(!req.body.actId){
            return res.status(400).json({
                error: 'ActId is Null'
            })
        }
        if(!req.body.userId){
            return res.status(400).json({
                error: 'UserId is Null'
            })
        }
        const findUser = await User.findOne({_id: req.body.userId})
        console.log('findUser',findUser)
        const checkActInUser = findUser.enrolling.filter(value => value==req.body.actId) 
        if(checkActInUser.length != 0){
            return res.status(400).json({
                error: "User has already Act"
            });
        }
        const resultAct = await Act.findByIdAndUpdate(req.body.actId, { $push: { enrolluser: req.body.userId }}, { new: true })
        .populate('enrolluser', 'fname lname major')
        const resultUser = await  User.findByIdAndUpdate(req.body.userId, { $push: { enrolling: req.body.actId } }, { new: true })
        .populate('enrolling', ' name')
        console.log('Act',resultAct,'User',resultUser)
        return res.status(200).json({...resultUser,enrolluser: resultUser.enrolling})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error
        });
    }
    /*Act.findByIdAndUpdate(req.body.actId, { $push: { enrolluser: req.body.userId }}, { new: true })
        .populate('enrolluser', ' fname lname')
        .exec((err, result) => {
            console.log('resgister',result)
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
                console.log("ลงทะเบียน", result.enrolluser)
            }
        });*/
};

exports.userunroll = (req, res, next) => {
    User.findByIdAndUpdate(req.body.userId, { $pull: { enrolling: req.body.actId } }, (err, result) => {
        if (err) {
            return res.status(400).json({ error: err });
        }
        next();
    });
};


exports.unroll = async(req, res) => {
    try {
        if(!req.body.actId){
            return res.status(400).json({
                error: 'ActId is Null'
            })
        }
        if(!req.body.userId){
            return res.status(400).json({
                error: 'UserId is Null'
            })
        }
        
        const resultAct = await Act.findByIdAndUpdate(req.body.actId, { $pull: { enrolluser: req.body.userId }}, { new: true })
        .populate('enrolluser', ' fname lname major')
        const resultUser = await  User.findByIdAndUpdate(req.body.userId, { $pull: { enrolling: req.body.actId } }, { new: true })
        .populate('enrolling', ' name')
        return res.status(200).json({...resultUser,enrolluser: resultUser.enrolling})
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
};
