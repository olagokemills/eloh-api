const Favour = require('../models/favourites.model');


//Get One favourited 
exports.findUserFav = async(req, res, next) => {

     try{
         const favour = await Favour.find({userId: req.params.id , deleted: {$eq: false }});
         if(!favour)
          {
              res.status(404).send('Favourites not found');
          }
         res.send(favour)
     }catch(err){
        return next(res.json({
            message: "Something went wrong",
        }))
     }
 }


//Read all favourited items, admin alone!
exports.findAll = async(req, res, next) => {
        try{
        const favour = await Favour.find({ deleted:{$eq:false} });
        res.send(favour);
        next();
            }catch(err){
                return next(res.json({
                    message: "something went wrong",
                })
              )
          }    
    }


exports.createFav= async(req, res) => {

  const { itemName, itemId, minBid, postedBy, userId, status, image} = req.body;

        if (!itemName || !itemId || !minBid || !postedBy || !userId || !status || !image ) {
            return res.status(400).send({ message: 'Missing fields, please retry' })
          }

          try {
            const favour = await Favour.create(req.body)
        
            return res.status(201).send({message:"Favourites created!"})
            
          } catch (e) {
            return res.status(500).send({message: "Something went wrong"})
        }
  }

  
exports.deleteFav = async(req, res)=>{

    try{
        const favour = await Favour.deleteById({
            _id: req.params.id
        })
        if(!favour){
            return res.status(404).json({message: "Favourites not found"});
        }
        return res.status(200).json({message: "Favourites Removed"})
    }catch(e){
        res.status(400).send({message: "Something went wrong, please try again"});
    }

  }



