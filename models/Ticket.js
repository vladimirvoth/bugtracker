const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['STORY', 'TASK', 'BUG'],
    required: true
  },
  priority: {
    type: String,
    enum: ['STANDARD', 'HIGH', 'BLOCKER'],
    required: true
  },
  status: {
    type: String,
    enum: ['OPEN', 'IN_PROGRESS', 'TESTING', 'DONE'],
    default: 'OPEN'
  },
  description: {
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

module.exports = mongoose.model('Ticket', TicketSchema);
