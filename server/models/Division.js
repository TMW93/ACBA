const {Schema, model} = require('mongoose');

const divisionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
  games: [{
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }],
  playedGames: [{
    type: Schema.Types.ObjectId,
    ref: 'Game'
  }],
});

const Division = model('Division', divisionSchema);

module.exports = Division;