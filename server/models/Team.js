const {Schema, model} = require('mongoose');

// const Division = require('./Division');

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  division: {
    type: String,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

const Team = model('Team', teamSchema);

module.exports = Team;