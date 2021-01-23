const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
  ticket_id: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  created_by: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
