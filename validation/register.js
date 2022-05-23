const Validator = require('validator');
const isEmpty = require('./is-empty');

const keys = require('../config/keys');

module.exports = function validateRegisterInput(data) {
  const errors = {};

  const processedData = {};
  processedData.name = !isEmpty(data.name) ? data.name : '';
  processedData.email = !isEmpty(data.email) ? data.email : '';
  processedData.password = !isEmpty(data.password) ? data.password : '';
  processedData.password2 = !isEmpty(data.password2) ? data.password2 : '';
  processedData.secret = !isEmpty(data.secret) ? data.secret : '';

  if (!Validator.isLength(processedData.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 characters';
  }

  if (Validator.isEmpty(processedData.name)) {
    errors.name = 'Name is required';
  }

  if (!Validator.isEmail(processedData.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(processedData.email)) {
    errors.email = 'Email is required';
  }

  if (!Validator.isLength(processedData.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (Validator.isEmpty(processedData.password)) {
    errors.password = 'Password is required';
  }

  if (!Validator.equals(processedData.password, processedData.password2)) {
    errors.password2 = 'Passwords must match';
  }

  if (Validator.isEmpty(processedData.password2)) {
    errors.password2 = 'Confirm password is required';
  }

  if (processedData.secret !== keys.registerSecret) {
    errors.secret = 'The secret is invalid';
  }

  if (Validator.isEmpty(processedData.secret)) {
    errors.secret = 'Secret is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
