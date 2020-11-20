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

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

module.exports.getUserByEmail = (email, callback) => {
  const query = { email };
  User.findOne(query, callback);
};

module.exports.findOrCreate = async (user, callback) => {
  const userExists = await User.findOne({
    email: user.email
  });

  if (!userExists) {
    const newUser = new User(user);

    newUser.save().then((user) => callback(user));
  } else {
    callback(userExists);
  }
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;

    callback(null, isMatch);
  });
};
