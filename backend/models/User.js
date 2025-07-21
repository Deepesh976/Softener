const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user: { type: String, required: true },
  phoneNo: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  password: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
