const mongoose = require('mongoose');
const yup = require('yup');

// TODO move yup schema to all schemas
const EMAIL_VALIDATION_SCHEMAS = yup.string().email();

// required
// default
// Numbers, Date: min, max
// Strings: enum, match, minLength, maxLength
// Custom validators
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minLength: 2,
    maxLength: 50,
    required: true,
    match: [
      /^[A-Z][a-z]+$/,
      'FirstName must starts  with capital letter, but got a "{VALUE}" ...',
    ],
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 50,
    required: true,
    match: /^[A-Z][a-z]+$/,
  },
  email: {
    type: String,
    // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    validate: v => EMAIL_VALIDATION_SCHEMAS.isValid(v),
    required: true,
  },
  birthday: {
    type: Date,
    max: new Date(),
  },
  gender: {
    type: String,
    // TODO move to constants
    enum: ['male', 'female', 'other'],
  },
  isMarried: {
    type: Boolean,
    default: false,
  },
  workExperience: {
    type: Number,
    min: 0,
    max: 100,
  },
});

const User = mongoose.model('User', userSchema);

// User.create({
//   firstName: 'Dsfsdfsd',
//   lastName: 'Qwert',
//   email: 'qwerty@qwerty',
//   birthday: '2024-10-10',
//   workExperience: -1,
// })
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

module.exports = User;
