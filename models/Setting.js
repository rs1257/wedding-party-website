const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const SettingSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const Setting = mongoose.model('settings', SettingSchema);
module.exports = Setting;
