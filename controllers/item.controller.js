const Item = require('../models/item.model');
const config = require('../config/config');
const jwt = require('jsonwebtoken');



//Get One User
exports.findOne = async(req, res, next) => {

     try{
         const item = await Item.findById(req.params.id);
         if(!item)
          {
              res.status(404).send('Item not found');
          }
         res.send(item)
     }catch(err){
        return next(res.json({
            message: "Something went wrong",
        }))
     }
 }


//Read all users
exports.findAll = async(req, res, next) => {
        try{
        const item = await Item.find({});
        res.send(item);
        next();
            }catch(err){
                return next(res.json({
                    message: "something went wrong",
                })
              )
          }    
    }


exports.createItem = async(req, res) => {

  const { name, description, category, posted_by, location, contact, display} = req.body;

        if (!name || !description || !category || !posted_by || !location || !contact || !display ) {
            return res.status(400).send({ message: 'Missing fields, please retry' })
          }

          try {
            const item = await Item.create(req.body)
        
            return res.status(201).send({message:"Item created!"})
            
          } catch (e) {
            return res.status(500).send({message: "Something went wrong"})
        }
  }

  
exports.deleteItem = async(req, res)=>{

    try{
        const item = await Item.findByIdAndRemove({
            _id: req.params.id
        })
        if(!item){
            return res.status(404).json({message: "item not found"});
        }
        return res.status(200).json({message: "item Removed"})
    }catch(e){
        res.status(400).send({message: "Something went wrong, please try again"});
    }

  }


  
exports.editItem = async (req, res) => {
    try {
      const item = await Item.findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
         { new: true, useFindAndModify: false}
      )
         .lean()
         .exec()
      if(!item){
        return res.status(404).send({message: "Item not found"})
      }
      res.status(200).json({ data: item })
    } catch (e) {
      res.status(400).end()
    }
  }


  exports.verifyItem = async (req, res) => {
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
      res.status(200).json({ message: "Status Changed!" })
    } catch (e) {
      console.error(e)
      res.status(500).end()
    }
  }

