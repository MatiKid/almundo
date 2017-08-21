'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var HotelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  stars: {
      type: Number,
      required: true,
      enum: [5,4,3,2,1]
  },
  recommended: {
      type: Boolean,
      default: false
  },
  price: {
    type: Number,
    required: true
  },
  amenities: {
      type: [{
            type: String
      }]
  }
});

module.exports = mongoose.model('Hotel', HotelSchema);