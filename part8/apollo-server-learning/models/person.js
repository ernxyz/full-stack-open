const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  phone: {
    type: String,
    required: true,
    minLength: 5,
  },
  street: {
    type: String,
    required: true,
    minLength: 5,
  },
  city: {
    type: String,
    required: true,
    minLength: 5,
  },
  friendOf: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    }
  ]
})

module.exports = mongoose.model("Person", schema)