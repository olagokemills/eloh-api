const mongoose = require('mongoose')
const soft = require('mongoose-delete');

const deleteSchema = new mongoose.Schema(
  {
    username: {
    type: String,
    required: true,
    trim: true
   },
   email: {
    type: String,
    required: true,
    trim: true
     },
  },
  { timestamps: true }
)

deleteSchema.plugin(soft);
module.exports = mongoose.model('Delete', deleteSchema)
 