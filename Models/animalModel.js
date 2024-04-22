const mongoose = require('mongoose')
const validator = require('validator');

//* ANIMAL SCHEMA
const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'Game with this name already exists'],
    trim: true
  },
  region: {
    type: String,
    enum: ['Africa', "Antarctica", "Asia", "Europe", "North America", "Australia", "South America", "Middle East", "Ocean", "Rivers", "Various continents"],
    required: [true, 'Region is required'],
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
  },
  class: {
    type: String,
    enum: ["reptiles", "mammals", "arthropods", "birds", "fish", "amphibians"],
    required: [true, 'Class is required'],
  },
  similarSpecies: {
    type: [String],
  },
  images: {
    type: [String],
    required: [true, 'Image/Images are required']
  }
},
  {
    toJSON: {
      virtuals: true,
      versionKey: false, //! This hides the '__v' field
      transform: function (doc, ret) {
        delete ret.id; //! This removes the 'id' field      
        // delete ret._id; //! This removes the '_id' field      
      }
    },
    toObject: { virtuals: true }
  }
)

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;