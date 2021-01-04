const express = require('express');
const router = express.Router();
const passport = require('passport');
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
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

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const tickets = await Ticket.find({ created_by: req.user.id });

    res.json(tickets);
  }
);

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
  async (req, res) => {
    const id = req.params.id;

    const ticket = await Ticket.findById(id);

    if (ticket.created_by !== req.user.id) {
      return res.status(401).json({
        msg: content.tickets.notFound
      });
    } else {
      const comments = await Comment.find({ ticket_id: id });

      res.json({ ...ticket._doc, ...{ comments } });
    }
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

        const comments = await Comment.find({ ticket_id: req.params.id });

        res.json({ ...ticket._doc, ...{ comments } });
      }
    } catch {
      return res.status(404).json({
        msg: content.tickets.notFound
      });
    }
  }
);

const commentValidation = [body('comment').not().isEmpty().trim().escape()];

router.post(
  '/:id/comments',
  commentValidation,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = validationResult(req).array();
    const id = req.params.id;
    const { comment } = req.body;

    if (errors.length > 0) {
      return res.status(422).json({ msg: errors[0].msg });
    } else {
      const ticket = await Ticket.findOne({ _id: id });

      const newComment = new Comment({
        ticket_id: id,
        comment,
        created_by: req.user.id
      });

      await newComment.save();

      const comments = await Comment.find({ ticket_id: id });

      res.json({ ...ticket._doc, ...{ comments } });
    }
  }
);

router.patch(
  '/:id/comments/:commentId',
  commentValidation,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = validationResult(req).array();

      if (errors.length > 0) {
        return res.status(422).json({ msg: errors[0].msg });
      } else {
        const comment = await Comment.findOne({
          _id: req.params.commentId
        });
        comment['comment'] = req.body.comment;

        await comment.save();

        const ticket = await Ticket.findOne({ _id: req.params.id });
        const comments = await Comment.find({ ticket_id: req.params.id });

        res.json({ ...ticket._doc, ...{ comments } });
      }
    } catch {
      return res.status(404).json({
        msg: content.tickets.notFound
      });
    }
  }
);

router.delete(
  '/:id/comments/:commentId',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const comment = await Comment.findOne({
        _id: req.params.commentId
      });

      await comment.remove();

      const ticket = await Ticket.findOne({ _id: req.params.id });
      const comments = await Comment.find({ ticket_id: req.params.id });

      res.json({ ...ticket._doc, ...{ comments } });
    } catch {
      return res.status(404).json({
        msg: content.tickets.notFound
      });
    }
  }
);

module.exports = router;
