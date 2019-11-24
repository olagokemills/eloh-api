const mongoose = require('mongoose');

const soft = require('mongoose-delete');

var ObjectId = mongoose.Schema.Types.ObjectId

const categorySchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        description:{
            type: ObjectId,
            required: true,
            trim: true
        },  
        image:{
            type:String,
        }
              
    },       
        
     { timestamps: true }

)

categorySchema.plugin(soft);
module.exports = mongoose.model('Category', categorySchema)