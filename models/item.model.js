const mongoose = require('mongoose')
//const bcrypt = require('bcrypt')

const itemSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },
        category:{
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        posted_by:{
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
            required: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            required: true,

        },
        contact:{
            type:String,
            required: true,
            trim: true
        },
        display: {
            type: String,
            required:true,

        }
              
    },       
        
     { timestamps: true }

)


module.exports = mongoose.model('Item', itemSchema)