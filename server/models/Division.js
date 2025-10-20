const {Schema, model} = require('mongoose');

const Team = require('./Team');

const divisionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  teams: [Team.schema],
});

const Division = model('Division', divisionSchema);

module.exports = Division;