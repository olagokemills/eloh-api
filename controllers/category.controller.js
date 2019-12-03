const Category = require('../models/category.model')


//Get One User
exports.findOne = async(req, res, next) => {

     try{
         const category = await Category.find({_id: req.params.id, deleted: {$eq: false }});
         if(!category)
          {
              res.status(404).send('Category not found');
          }
         res.send(category)
     }catch(err){
        return next(res.json({
            message: "Something went wrong",
        }))
     }
 }


//Read all users
exports.findAll = async(req, res, next) => {
        try{
        const category = await Category.find({ deleted: {$eq: false }});
        res.send(category);
        next();
            }catch(err){
                return next(res.json({
                    message: "something went wrong",
                })
              )
          }    
    }


exports.createCategory = async(req, res) => {

  const { name} = req.body;

        if (!name ) {
            return res.status(400).send({ message: 'Missing fields, please retry' })
          }

          try {
            const category = await Category.create(req.body)
        
            return res.status(201).send({message:"Category created!"})
            
          } catch (e) {
            return res.status(500).send({message: "Something went wrong"})
        }
  }

  
exports.deleteCategory = async(req, res)=>{

    try{
        const category = await Category.deleteById({
            _id: req.params.id
        })
        if(!category){
            return res.status(404).json({message: "Category not found"});
        }
        return res.status(200).json({message: "Category Removed"})
    }catch(e){
        res.status(400).send({message: "Something went wrong, please try again"});
    }

  }


  
exports.editCategory = async (req, res) => {
    try {
      const category = await Category.findOneAndUpdate(
        {
          _id: req.params.id
        },
        req.body,
         { new: true, useFindAndModify: false}
      )
         .lean()
         .exec()
      if(!category){
        return res.status(404).send({message: "Category not found"})
      }
      res.status(200).json({ data: category })
    } catch (e) {
      res.status(400).end()
    }
  }

