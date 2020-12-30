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

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    const id = req.params.id;

    Ticket.getTicketById(id, (err, ticket) => {
      if (err) {
        res.status(422).json({ msg: errors[0].msg });
      }

      if (ticket.created_by !== req.user.id) {
        return res.status(401).json({
          msg: content.loginError
        });
      } else {
        res.json(ticket);
      }
    });
  }
);

const updateTicketValidation = [
  body('value').not().isEmpty().trim().escape(),
  body('property').not().isEmpty().trim().escape()
];

router.patch(
  '/:id',
  updateTicketValidation,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = validationResult(req).array();

      if (errors.length > 0) {
        return res.status(422).json({ msg: errors[0].msg });
      } else {
        const ticket = await Ticket.findOne({ _id: req.params.id });
        ticket[req.body.property] = req.body.value;
        await ticket.save();

        res.json(ticket);
      }
    } catch {
      return res.status(404).json({
        msg: content.notFound
      });
    }
  }
);

module.exports = router;
