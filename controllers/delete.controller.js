const Del = require('../models/delete.model');

exports.addDel = async(req, res) => {
    //Check for content
    //Required fields check

      try {
        const del = await Del.create(req.body)
        return res.status(201).send({message:"Bid Submitted!"})
        
      } catch (e) {
        return res.status(500).send({message: e})
    }
}

exports.getDel = async(req, res, next) => {
    try{
    const del = await Del.find({});
    res.send(del);
    next();
        }catch(err){
            return next(res.json({
                message: "something went wrong",
               // authData
            })
          )
      }    
}



exports.deleteDel = async(req, res)=>{

    //       const  _id = req.params.id

    // Del.delete(_id).exec(function (err, result) { 
    //     if(err)
    //     console.log(err)
    //     else{
    //         console.log(result);
    //     }
    //  });


     //Del.save(function () {
        // mongodb: { deleted: false, name: 'Fluffy' }
     
        var _id = req.params.id
     
        // // note: you should invoke exactly delete() method instead of standard fluffy.remove()
        // Del.delete(_id, function () {
        //     // mongodb: { deleted: true, name: 'Fluffy', deletedBy: ObjectId("53da93b16b4a6670076b16bf")}
     
        //     Del.restore(function () {
        //         // mongodb: { deleted: false, name: 'Fluffy' }
        //     });
        // });

        Del.deleteById(_id, function (err, petDocument) {
            if(err)
            console.log(err)
            console.log(petDocument)
            // mongodb: { deleted: true, name: 'Fluffy', _id: '53da93b1...' }
        });
         
     
    //});
    // try{
    //     const del = await Delete.findByIdAndRemove({
    //         _id: req.params.id
    //     })
    //     console.log(bid);
    //     if(!bid){
    //         return res.status(404).json({message: "Bid not found"});
    //     }
    //     return res.status(200).json({message: "Bid Removed"})
    // }catch(e){
    //     res.status(400).send({message: "Something went wrong, please try again"});
    // }

  }
