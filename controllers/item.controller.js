const Item = require('../models/item.model');
const config = require('../config/config');
const jwt = require('jsonwebtoken');


//Read all users
exports.findAll = async(req, res, next) => {
    // jwt.verify(req.token, config.secret, (err, authData) => {
    //    if(err){
    //     res.sendStatus(403).end();
    //    } });
        try{
        const item = await Item.find({});
        res.send(item);
        next();
            }catch(err){
                return next(res.json({
                    message: "something went wrong",
                   // authData
                })
              )
          }    
    }


exports.createItem = async(req, res) => {
        //Check for content
        //Required fields check
        const { name, description, category, posted_by, location, contact, isActive, display} = req.body;

        if (!name || !description || !category || !posted_by || !location || !contact || !isActive || !display ) {
            return res.status(400).send({ message: 'need email and password' })
          }

          try {
            const item = await Item.create(req.body)
           //const token = newToken(user)
        //    jwt.sign({user}, config.secret, { expiresIn: config.jwtExp }, (err) => {
        //     res.status(201).send({
        //       token
        //     });
        //   });
            return res.status(201).send({message:"Item created!"})
            
          } catch (e) {
            return res.status(500).send({message: e})
        }
  }

  
exports.deleteItem = async(req, res)=>{
    // jwt.verify(req.token, config.secret, (err, authData) => {
    //   if(err){
    //    res.sendStatus(403).end();
    //   } });
    try{
        const user = await User.findByIdAndRemove({
            _id: req.params.id
        })
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "User Removed"})
    }catch(e){
        res.status(400).end();
    }

  }