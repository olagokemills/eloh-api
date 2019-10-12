const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')

var ObjectId = mongoose.Schema.Types.ObjectId

const bidSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        itemId:{
            type: ObjectId,
            required: true,
            trim: true
        },
        posted_by:{
            type: String,
            required: true,
            trim: true
        },
        bid_by:{
            type: String,
            required: true,
            trim: true
        },
        category:{
            type: String,
            required: true,
            trim: true
        },
        amount:{
            type:String,
            required: true,
            trim: true
        },
        status:{
            type: Boolean,
            required:true
        },
              
    },       
        
     { timestamps: true }

)


module.exports = mongoose.model('Bid', bidSchema)