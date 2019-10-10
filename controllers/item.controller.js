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
        //const { name, email, password, city, level, phone, interests} = req.body;

        // if (!req.body.username || !req.body.password) {
        //     return res.status(400).send({ message: 'need email and password' })
        //   }
        //     console.log(req.body);
          try {
            const item = await Item.create(req.body)
           //const token = newToken(user)
        //    jwt.sign({user}, config.secret, { expiresIn: config.jwtExp }, (err) => {
        //     res.status(201).send({
        //       token
        //     });
        //   });
            return res.status(201).send({message:"Registration Ok!"})
            
          } catch (e) {
            return res.status(500).end()
        }
  }