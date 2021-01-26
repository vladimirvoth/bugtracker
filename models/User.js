const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String
  },
  authType: {
    type: String,
    enum: ['LOCAL', 'FACEBOOK', 'GITHUB'],
    required: true
  },
  emailConfirmed: {
    type: Boolean,
    default: false
  },
  emailConfirmationCode: {
    type: String
  },
  passwordRecoveryCode: {
    type: String
  },
  picture: {
    type: String
  }
});

const User = (module.exports = mongoose.model('User', UserSchema));

module.exports.findOrCreate = async (user) => {
  const userExists = await User.findOne({
    email: user.email
  });

  if (!userExists) {
    const newUser = new User(user);
    const savedUser = await newUser.save();

    return savedUser;
  } else {
    return userExists;
  }
};
