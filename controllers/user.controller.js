const User = require('../models/user.model');


//Read all users
exports.findAll = async (req, res, next) => {
    try{
        const user = await User.find({});
        res.send(user);
        next();
    }catch(err){
        return next(res.json({
            "message": "something went wrong"
        }))
    }
}