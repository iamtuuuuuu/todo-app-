const mongoose = require('mongoose')
const mongoose_delete = require('mongoose-delete')
const Schema = mongoose.Schema

// create schema
const TodoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  details: {
    type: String,
    required: true
  },
  user: {
    type: String,
    // required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: String
  }
})

TodoSchema.plugin(mongoose_delete, {
  deletedAt: true,
  overrideMethods: 'all' 
})

module.exports = mongoose.model('Todo', TodoSchema)