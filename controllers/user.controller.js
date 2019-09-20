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

//Get One User
 exports.findOne = async(req, res, next) => {
     try{
         const user = await User.findById(req.params.id);
         if(!user)
          {
              res.status(404).send('User not found');
          }
         res.send(user)
     }catch(err){
        return next(res.json({
            "message": "Something went wrong"
        }))
     }
 }