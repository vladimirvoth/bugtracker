const express = require('express');
const router = express.Router();
const passport = require('passport');
const Ticket = require('../models/Ticket');
const content = require('../content');
const { body, validationResult } = require('express-validator');

const ticketValidation = [
  body('ticket.title')
    .not()
    .isEmpty()
    .withMessage(content.tickets.emptyTitle)
    .trim()
    .escape(),
  body('ticket.type')
    .not()
    .isEmpty()
    .withMessage(content.tickets.emptyType)
    .trim()
    .escape(),
  body('ticket.priority')
    .not()
    .isEmpty()
    .withMessage(content.tickets.emptyPriority)
    .trim()
    .escape(),
  body('ticket.description')
    .not()
    .isEmpty()
    .withMessage(content.tickets.emptyDescription)
    .trim()
    .escape()
];

router.post(
  '/',
  ticketValidation,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = validationResult(req).array();
    const { ticket } = req.body;

    if (errors.length > 0) {
      console.log(errors);
      return res.status(422).json({ msg: errors[0].msg });
    } else {
      const newTicket = new Ticket({
        ...ticket,
        ...{
          created_by: req.user.id
        }
      });

      newTicket
        .save()
        .then((ticket) => {
          res.json(ticket);
        })
        .catch((errors) => res.status(422).json({ msg: errors[0].msg }));
    }
  }
);

module.exports = router;
