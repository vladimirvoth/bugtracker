const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const { createRandomString } = require('../helpers');
const content = require('../content');

require('dotenv').config();

const registerValidation = [
  body('username').not().isEmpty().withMessage(content.emptyUsername).trim(),
  body('email')
    .isEmail()
    .withMessage(content.invalidEmailAddress)
    .custom(async (value) => {
      const user = await User.findOne({
        email: value
      });

      if (user && user.length !== 0) {
        throw new Error(content.existingEmailAddress);
      }
      return true;
    })
    .normalizeEmail(),
  body('password')
    .not()
    .isEmpty()
    .withMessage(content.emptyPassword)
    .isLength({
      min: 8,
      max: 40
    })
    .withMessage(content.invalidPassword)
    .trim()
];

router.post('/email', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      email
    });

    if (user && user.length !== 0) {
      return res.status(409).json({
        msg: content.existingEmailAddress
      });
    } else {
      return res.json({ success: true });
    }
  } catch {
    return res.status(404).json({
      msg: content.standardError
    });
  }
});

router.post('/register', registerValidation, (req, res) => {
  try {
    const errors = validationResult(req).array();
    const { username, email, password } = req.body;

    if (errors.length > 0) {
      return res.status(422).json({ msg: errors[0].msg });
    } else {
      const emailConfirmationCode = createRandomString(30);

      const newUser = new User({
        username,
        email,
        authType: 'LOCAL',
        emailConfirmationCode: emailConfirmationCode
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          const savedUser = newUser.save();

          return res.json(savedUser);
        });
      });
    }
  } catch {
    return res.status(404).json({
      msg: content.standardError
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        msg: content.loginError
      });
    }

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign({ data: user }, process.env.SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        return res.json({
          token: 'JWT ' + token
        });
      } else {
        return res.status(401).json({
          msg: content.loginError
        });
      }
    });
  } catch {
    return res.status(404).json({
      msg: content.standardError
    });
  }
});

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: 'email'
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { scope: 'email' }),
  async (req, res) => {
    try {
      const user = {
        username: req.user.displayName,
        email: req.user._json.email,
        authType: 'FACEBOOK',
        emailConfirmed: true,
        picture: req.user._json.picture.data.url
      };

      const newUser = await User.findOrCreate(user);

      const token = jwt.sign({ data: newUser }, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      res.cookie('JWT', 'JWT ' + token);
      res.redirect('/auth/social-auth-callback');
    } catch {
      return res.status(404).json({
        msg: content.standardError
      });
    }
  }
);

router.get(
  '/github',
  passport.authenticate('github', {
    scope: 'user:email'
  })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { scope: 'user:email' }),
  async (req, res) => {
    try {
      const user = {
        username: req.user._json.login,
        email: req.user.emails[0].value,
        authType: 'GITHUB',
        emailConfirmed: true,
        picture: req.user._json.avatar_url
      };

      const newUser = await User.findOrCreate(user);

      const token = jwt.sign({ data: newUser }, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      res.cookie('JWT', 'JWT ' + token);
      res.redirect('/auth/social-auth-callback');
    } catch {
      return res.status(404).json({
        msg: content.standardError
      });
    }
  }
);

router.post('/reset-password', (req, res) => {
  return res.json({
    success: true
  });
});

module.exports = router;
