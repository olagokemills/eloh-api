const User = require('../models/user.model');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')

function newToken(user){
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, config.secret, {
    expiresIn: config.jwtExp
  })
}


//Read all users
exports.findAll = async(req, res, next) => {
    jwt.verify(req.token, config.secret, (err, authData) => {
       if(err){
        res.sendStatus(403).end();
       } });
        try{
        const user = await User.find({deleted:{$eq: false}});
        res.send(user);
        next();
            }catch(err){
                return next(res.json({
                    message: "something went wrong",
                   // authData
                })
              )
          }    
    }

//Get One User
 exports.findOne = async(req, res, next) => {
  jwt.verify(req.token, config.secret, (err, authData) => {
    if(err){
     res.sendStatus(403).end();
    } });
     try{
         const user = await User.find({_id:req.params.id, deleted:{$eq:false}});
         if(!user)
          {
              res.status(404).send('User not found');
          }
         res.send(user)
     }catch(err){
        return next(res.json({
            message: "Something went wrong",
            authData
        }))
     }
 }

//Create User
exports.createUser = async(req, res) => {
       // Required fields check
        if (!req.body.email || !req.body.password) {
            return res.status(400).send({ message: 'Incomplete details, try again' })
          }

            const user = await User.findOne({ email: req.body.email })
            .select('email')
            .exec()
      
          if (user) {
            return res.status(403).send({message:"User exists" }).end();
          }
          try {
            const user = await User.create(req.body)
           //const token = newToken(user)
           jwt.sign({user}, config.secret, { expiresIn: config.jwtExp }, (err) => {
            res.status(201).send({
              token
            });
          });
            return res.status(201).send({message:"Registration Ok!", user })
          } catch (err) { 
            console.log(err);
            return res.status(500).end()
           
        }
  }

exports.signIn = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ message: 'need email and password' })
    }
  
    const invalid = { message: 'Invalid email and passoword combination' }
  
    try {
      const user = await User.findOne({ email: req.body.email })
        .select('email password isAdmin')
        .exec()
  
      if (!user) {
        return res.status(401).send(invalid)
      }
  
      const match = await user.checkPassword(req.body.password)
  
      if (!match) {
        return res.status(401).send(invalid)
      }
      jwt.sign({ _id: user.id, isAdmin: user.isAdmin, email: user.email}, config.secret, { expiresIn: config.jwtExp }, (err, token) => {
        res.status(200).send({ message: "Logged In",
          token,
          user
        });
      });
    } catch (e) {
      console.error(e)
      res.status(500).end()
    }
  }

  exports.deleteUser = async(req, res)=>{
    jwt.verify(req.token, config.secret, (err, authData) => {
      if(err){
       res.sendStatus(403).end();
      } });
    try{
        const user = await User.deleteById({
            _id: req.params.id
        })
        if(!user){
            return res.status(404).send({message: "User not found"});
        }
        return res.status(200).json({message: "User Removed"})
    }catch(e){
        res.status(400).end();
    }

  }


  exports.updateUser = async (req, res) => {
    
    jwt.verify(req.token, config.secret, (err, authData) => {
      if(err){
       res.sendStatus(403).end();
      } });

    try {
      const user = await User.findOneAndUpdate(
        {
          _id: req.params.userId
        },
        req.body,
         { new: true}
      )
         .lean()
         .exec()

      if(!user){
        return res.status(400).end()
      }
  
      res.status(200).json({ data: user })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }


  exports.resetPassword = (req,res) =>{
          crypto.randomBytes(32,(err, buffer)=>{
            if(err)
            {
              console.log(err)
            }
            const keys = buffer.toString('hex')
            const user =  User.findOne({ email: req.body.email })
                .then(user => {
                  if(!user){
                  return res.status(404).json({ message: 'User not found, please try again'}).end()
                }
                user.resetToken = keys
                user.resetTokenExp = Date.now() + 360000;
                return user.save();
              })
              .then(result => {
                console.log('done');
              })
              .catch(err => {
                console.log(err)
              })
          });
  };