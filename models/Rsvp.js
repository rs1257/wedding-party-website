const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const RsvpSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  attending: {
    type: String,
  },
  menuChoices: { // e.g. {starter: lamb, main: steak .etc}
    type: Map,
    of: String,
  },
  additionalNotes: {
    type: String,
  },
});

const Rsvp = mongoose.model('rsvp', RsvpSchema);
module.exports = Rsvp;
