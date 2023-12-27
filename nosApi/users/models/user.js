const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Definir la estructura del esquema del usuario
  // ...
});

const User = mongoose.model('User', userSchema);

module.exports = User;