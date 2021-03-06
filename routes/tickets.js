const express = require('express');
const router = express.Router();
const passport = require('passport');
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
const User = require('../models/User');
const content = require('../content');
const { body, validationResult } = require('express-validator');

const ticketValidation = [
  body('ticket.title')
    .not()
    .isEmpty()
    .withMessage(content.tickets.emptyTitle)
    .trim(),
  body('ticket.type')
    .not()
    .isEmpty()
    .withMessage(content.tickets.emptyType)
    .trim(),
  body('ticket.priority')
    .not()
    .isEmpty()
    .withMessage(content.tickets.emptyPriority)
    .trim(),
  body('ticket.description')
    .not()
    .isEmpty()
    .withMessage(content.tickets.emptyDescription)
    .trim()
];

const updateTicketValidation = [
  body('value').not().isEmpty().trim(),
  body('property').not().isEmpty().trim()
];

const commentValidation = [body('comment').not().isEmpty().trim()];

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const tickets = await Ticket.find({ created_by: req.user.id });

      return res.json(tickets);
    } catch {
      return res.status(404).json({
        msg: content.tickets.notFound
      });
    }
  }
);

router.post(
  '/',
  ticketValidation,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = validationResult(req).array();
      const { ticket } = req.body;

      if (errors.length > 0) {
        return res.status(400).json({ msg: errors[0].msg });
      } else {
        const newTicket = new Ticket({
          ...ticket,
          ...{
            created_by: req.user.id
          }
        });
        const savedTicket = await newTicket.save();

        return res.json(savedTicket);
      }
    } catch {
      return res.status(404).json({
        msg: content.tickets.notFound
      });
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const id = req.params.id;
      const ticket = await Ticket.findById(id);

      if (ticket.created_by !== req.user.id) {
        return res.status(400).json({
          msg: content.tickets.notFound
        });
      } else {
        const comments = await Comment.find({ ticket_id: id });
        const user = await User.findById(ticket.created_by);

        return res.json({
          ...ticket._doc,
          ...{ comments },
          ...{
            created_by_user: {
              username: user.username,
              picture: user.picture
            }
          }
        });
      }
    } catch {
      return res.status(404).json({
        msg: content.tickets.notFound
      });
    }
  }
);

router.patch(
  '/:id',
  updateTicketValidation,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = validationResult(req).array();

      if (errors.length > 0) {
        return res.status(400).json({ msg: errors[0].msg });
      } else {
        const ticket = await Ticket.findOne({ _id: req.params.id });
        ticket[req.body.property] = req.body.value;
        await ticket.save();

        const comments = await Comment.find({ ticket_id: req.params.id });
        const user = await User.findById(ticket.created_by);

        return res.json({
          ...ticket._doc,
          ...{ comments },
          ...{
            created_by_user: {
              username: user.username,
              picture: user.picture
            }
          }
        });
      }
    } catch {
      return res.status(404).json({
        msg: content.tickets.notFound
      });
    }
  }
);

router.post(
  '/:id/comments',
  commentValidation,
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const errors = validationResult(req).array();
      const id = req.params.id;
      const { comment } = req.body;

      if (errors.length > 0) {
        return res.status(400).json({ msg: errors[0].msg });
      } else {
        const ticket = await Ticket.findOne({ _id: id });

        const newComment = new Comment({
          ticket_id: id,
          comment,
          created_by: req.user.id
        });

        await newComment.save();

        const comments = await Comment.find({ ticket_id: id });
        const user = await User.findById(ticket.created_by);

        return res.json({
          ...ticket._doc,
          ...{ comments },
          ...{
            created_by_user: {
              username: user.username,
              picture: user.picture
            }
          }
        });
      }
    } catch {
      return res.status(404).json({
        msg: content.tickets.notFound
      });
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
        return res.status(400).json({ msg: errors[0].msg });
      } else {
        const comment = await Comment.findOne({
          _id: req.params.commentId
        });
        comment['comment'] = req.body.comment;

        await comment.save();

        const ticket = await Ticket.findOne({ _id: req.params.id });
        const comments = await Comment.find({ ticket_id: req.params.id });
        const user = await User.findById(ticket.created_by);

        return res.json({
          ...ticket._doc,
          ...{ comments },
          ...{
            created_by_user: {
              username: user.username,
              picture: user.picture
            }
          }
        });
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
      const user = await User.findById(ticket.created_by);

      return res.json({
        ...ticket._doc,
        ...{ comments },
        ...{
          created_by_user: {
            username: user.username,
            picture: user.picture
          }
        }
      });
    } catch {
      return res.status(404).json({
        msg: content.tickets.notFound
      });
    }
  }
);

module.exports = router;
