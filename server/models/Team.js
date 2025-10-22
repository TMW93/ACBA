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
  // players: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  payment: {
    type: Boolean,
    default: false,
  },
});

const Team = model('Team', teamSchema);

module.exports = Team;