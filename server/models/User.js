const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, trim: true, minlength: 1 },
  password: String,
  profilePic: { type: String, default: "/images/profile-picture.png" },
  description: {
    type: String,
    default: "I have not added a description about me yet"
  },
}, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const User = mongoose.model('User', userSchema);
module.exports = User;
