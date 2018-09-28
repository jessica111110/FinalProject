const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  lat: {
    type: Number,
    required: [true, 'The location is required']
  },
  long: {
    type: Number,
    required: [true, 'The location is required']
  },
  address: String,
  image: {
    type: String,
    required: [true, "A picture is required"]
  },
  tag: {
    type: String,
    enum: ["Beach", "City", "Climbing", "Coast", "Desert", "Djungle", "Glacier", "Lake", "Mountains", "Sea", "Snow", "Up in the air", "Waterfall", "Woods", "Other"]
  },
  _owner: { type: mongoose.Schema.ObjectId, ref: "User" }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;