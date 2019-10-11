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
        const item = await Item.findByIdAndRemove({
            _id: req.params.id
        })
        console.log(item);
        if(!item){
            return res.status(404).json({message: "item not found"});
        }
        return res.status(200).json({message: "item Removed"})
    }catch(e){
        res.status(400).send({message: "Something went wrong, please try again"});
    }

  }


  
exports.editItem = async (req, res) => {
    
    // jwt.verify(req.token, config.secret, (err, authData) => {
    //   if(err){
    //    res.sendStatus(403).end();
    //   } });

    try {
      const item = await Item.findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
         { new: true}
      )
         .lean()
         .exec()
      if(!item){
        return res.status(404).send({message: "Item not found"})
      }
      res.status(200).json({ data: item })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }


  exports.verifyItem = async (req, res) => {
    
    // jwt.verify(req.token, config.secret, (err, authData) => {
    //   if(err){
    //    res.sendStatus(403).end();
    //   } });

      //Required fields check
      const {isActive} = req.body;

      if (!isActive) {
          return res.status(400).send({ message: 'Status required' })
        }

    try {
      const item = await Item.findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
         { new: true}
      )
         .lean()
         .exec()
      if(!item){
        return res.status(404).send({message: "Item not found"})
      }
      res.status(200).json({ message: "Item Verified!" })
    } catch (e) {
      console.error(e)
      res.status(500).end()
    }
  }

