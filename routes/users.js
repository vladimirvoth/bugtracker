const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      picture: req.user.picture
    });
  }
);

module.exports = router;
