const Bid = require('../models/bid.model');
const config = require('../config/config');
const jwt = require('jsonwebtoken');


//Get One User
exports.findOne = async(req, res, next) => {
  // jwt.verify(req.token, config.secret, (err, authData) => {
  //   if(err){
  //    res.sendStatus(403).end();
  //   } });
     try{
         const bid = await Bid.findById(req.params.id);
         if(!bid)
          {
              res.status(404).send('Bid not found');
          }
         res.send(bid)
     }catch(err){
       console.log(err)
        return next(res.json({
            message: "Something went wrong",
        }))
     }
 }


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

  
exports.deleteBid = async(req, res)=>{
    // jwt.verify(req.token, config.secret, (err, authData) => {
    //   if(err){
    //    res.sendStatus(403).end();
    //   } });
    try{
        const bid = await Bid.findByIdAndRemove({
            _id: req.params.id
        })
        console.log(bid);
        if(!bid){
            return res.status(404).json({message: "Bid not found"});
        }
        return res.status(200).json({message: "Bid Removed"})
    }catch(e){
        res.status(400).send({message: "Something went wrong, please try again"});
    }

  }


  
exports.updateBid = async (req, res) => {
    
    // jwt.verify(req.token, config.secret, (err, authData) => {
    //   if(err){
    //    res.sendStatus(403).end();
    //   } });

    try {
      const bid = await Bid.findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
         { new: true}
      )
         .lean()
         .exec()
      if(!bid){
        return res.status(404).send({message: "Bid not found"})
      }
      res.status(200).json({ data: bid })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }


  exports.acceptBid = async (req, res) => {
    
    // jwt.verify(req.token, config.secret, (err, authData) => {
    //   if(err){
    //    res.sendStatus(403).end();
    //   } });

      //Required fields check
      const {status} = req.body;

      if (!status) {
          return res.status(400).send({ message: 'Status required' })
        }

    try {

      const bid =  await Bid.findById(
         req.params.id
      )
      if(!bid){
        return res.status(404).send({message: "Bid not found"})
      }
      if(bid.status == true){
        return res.status(403).send({message: "Bid already accepted!"}).end();
      }

      const newbid = await Bid.findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
         { new: true}
      )
         .lean()
         .exec()
         console.log(newbid)
      if(!newbid){
        return res.status(404).send({message: "Bid not found"})
      }
      res.status(200).json({ message: "Item Verified!" })
    } catch (e) {
      console.error(e)
      res.status(500).end()
    }
  }

