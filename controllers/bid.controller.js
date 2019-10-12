const Bid = require('../models/bid.model');
const config = require('../config/config');
const jwt = require('jsonwebtoken');


//Read all users
exports.findAll = async(req, res, next) => {
    // jwt.verify(req.token, config.secret, (err, authData) => {
    //    if(err){
    //     res.sendStatus(403).end();
    //    } });
        try{
        const bid = await Bid.find({});
        res.send(bid);
        next();
            }catch(err){
                return next(res.json({
                    message: "something went wrong",
                   // authData
                })
              )
          }    
    }


exports.createBid = async(req, res) => {
        //Check for content
        //Required fields check
        const { name, itemId, category, bid_by, posted_by, amount, status} = req.body;

        if (!name || !itemId || !category || !posted_by || !bid_by || !amount || !status ) {
            return res.status(400).send({ message: 'Missing fields!' })
          }

          try {
            const bid = await Bid.create(req.body)
            return res.status(201).send({message:"Bid Submitted!"})
            
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

