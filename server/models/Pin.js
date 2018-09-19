const mongoose = require('mongoose');

const pinSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, 'The location is required']
  },
  image: {
    type: String,
    required: [true, "A picture is required"]
  },
  tag: {
    type: String,
    enum: ['Beach', 'Mountains', 'Snow', 'Sports', 'Wild/Remote', "Forest", "Desert", "Other"]
  },
  _owner: { type: Schema.ObjectId, ref: "User" }
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const Pin = mongoose.model('Pin', pinSchema);

module.exports = Pin;