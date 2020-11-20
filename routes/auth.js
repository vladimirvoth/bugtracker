const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const User = require('../models/User');
const { createRandomString } = require('../helper');
const content = require('../content');

require('dotenv').config();

router.post('/email', async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({
    email
  });

  if (user && user.length !== 0) {
    return res.json({ emailExists: true });
  }

  return res.json({ emailExists: false });
});

const registerValidation = [
  body('username')
    .not()
    .isEmpty()
    .withMessage(content.emptyUsername)
    .trim()
    .escape(),
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
    .escape()
];

router.post('/register', registerValidation, (req, res) => {
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
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser
          .save()
          .then((user) => {
            res.json(user);
          })
          .catch((errors) => res.status(422).json({ msg: errors[0].msg }));
      });
    });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.getUserByEmail(email, (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.status(401).json({
        msg: content.loginError
      });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign({ data: user }, process.env.SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        res.json({
          token: 'JWT ' + token
        });
      } else {
        return res.status(401).json({
          msg: content.loginError
        });
      }
    });
  });
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
  (req, res) => {
    const user = {
      username: req.user.displayName,
      email: req.user._json.email,
      authType: 'FACEBOOK',
      emailConfirmed: true,
      picture: req.user._json.picture.data.url
    };

    User.findOrCreate(user, (user) => {
      const token = jwt.sign({ data: user }, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      res.cookie('JWT', 'JWT ' + token);
      res.redirect('/auth/social-auth-callback');
    });
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
  (req, res) => {
    const user = {
      username: req.user._json.login,
      email: req.user.emails[0].value,
      authType: 'GITHUB',
      emailConfirmed: true,
      picture: req.user._json.avatar_url
    };

    User.findOrCreate(user, (user) => {
      const token = jwt.sign({ data: user }, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      res.cookie('JWT', 'JWT ' + token);
      res.redirect('/auth/social-auth-callback');
    });
  }
);

router.post('/reset-password', (req, res) => {
  res.json({
    success: true
  });
});

module.exports = router;
