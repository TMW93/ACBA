const {Schema, model} = require('mongoose');

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  division: {
    type: Schema.Types.ObjectId,
    ref: 'Division'
  },
  payment: {
    type: String,
    default: 'Unpaid',
  },
  wins: {
    type: Number,
    default: 0,
  },
  losses: {
    type: Number,
    default: 0,
  },
  draws: {
    type: Number,
    default: 0,
  },
  totalPoints: {
    type: Number,
    default: 0,
  },
})

const Team = model('Team', teamSchema);

module.exports = Team;