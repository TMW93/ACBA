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
    required: true,
  },
  teamTwo: {
    type: String,
    required: true,
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
    type: String,
  },
  loser: {
    type: String,
  }
});

const Game = model('Game', gameSchema);

module.exports = Game;