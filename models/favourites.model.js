const mongoose = require('mongoose');

const soft = require('mongoose-delete');

var ObjectId = mongoose.Schema.Types.ObjectId

const favouritesSchema = new mongoose.Schema(
    {
        item_name:{
            type: String,
            required: true,
            trim: true
        },
        itemId:{
            type: ObjectId,
            required: true,
            trim: true
        },
        minBid:{
            type: String,
            required: true,
            trim: true
        },
        postedBy:{
            type: String,
            required: true,
            trim: true
        },
        UserId:{
            type: ObjectId,
            required: true,
            trim: true
        },
        status:{
            type: Boolean,
            required:true
        },  
        image:{
            type:String,
            required:true
        }
              
    },       
        
     { timestamps: true }

)

favouritesSchema.plugin(soft);
module.exports = mongoose.model('Favourites', favouritesSchema)