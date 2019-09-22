const User = require('../models/user.model');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
  

//Read all users
exports.findAll = async(req, res, next) => {
    // jwt.verify(req.token, config.secret, (err, authData) => {
    //    if(err){
    //     res.sendStatus(403).end();
    //    } });
        try{
        const user = await User.find({});
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
         const user = await User.findById(req.params.id);
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
        //Check for content
        //Required fields check
        if (!req.body.username || !req.body.password) {
            return res.status(400).send({ message: 'need email and password' })
          }
            console.log(req.body);
          try {
            const user = await User.create(req.body)
           //const token = newToken(user)
        //    jwt.sign({user}, config.secret, { expiresIn: config.jwtExp }, (err) => {
        //     res.status(201).send({
        //       token
        //     });
        //   });
            return res.status(201).send({message:"Registration Ok!",token })
            
          } catch (e) {
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
        .select('email password')
        .exec()
  
      if (!user) {
        return res.status(401).send(invalid)
      }
  
      const match = await user.checkPassword(req.body.password)
  
      if (!match) {
        return res.status(401).send(invalid)
      }
  
     // const token = newToken(user)
      jwt.sign({user}, config.secret, { expiresIn: config.jwtExp }, (err, token) => {
        res.status(201).send({
          token
        });
      });
      //return res.status(201).send({ token })
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