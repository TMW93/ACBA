const mongoose = require('mongoose');
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
  teams: [{
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }],
});

const Division = model('Division', divisionSchema);

module.exports = Division;