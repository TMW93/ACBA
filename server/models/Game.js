const {Schema, model} = require('mongoose');

const gameSchema = new Schema({
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  teamOne: {
    type: String,
  },
  teamTwo: {
    type: String,
  },
  venue: {
    type: String,
    required: true,
  },
  scoreWinner: {
    type: Number,
    default: 0,
  },
  scoreLoser: {
    type: Number,
    default: 0,
  },
  winner: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
});

const Game = model('Game', gameSchema);

module.exports = Game;