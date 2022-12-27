import React from 'react';
import validator from 'validator';
import { authentication } from "../firebase";

const required = (value) => {
  if (!value.toString().trim().length) {
    return 'This field is required';
  }
};
 
const validEmail = (value) => {
  if (!validator.isEmail(value)) {
    return `${value} is not a valid email.`
  }
};

const minLength = (value, minLength) => {
  if (value.toString().trim().length < minLength) {
    return `This field must be at least ${minLength} characters`;
  }
}

const maxLength = (value, maxLength) => {
  if (value.toString().trim().length > maxLength) {
    return `This field must be at most ${maxLength} characters`;
  }
}

const between = (value, minLength, maxLength) => {
  if (value.toString().trim().length < minLength || 
      value.toString().trim().length > maxLength) {
    return `This field must be between ${minLength} and  ${maxLength} characters`;
  }
}

const emailExists = async (email) => {
  const signInMethods = await authentication.fetchSignInMethodsForEmail(email);
  
  if(signInMethods.length > 0) {
    return 'Email already exists';
  }
}
 
const password = (value, props, components) => {
  if (value !== components['confirm'][0].value) { 
    return <span className="error">Passwords are not equal.</span>
  }
};

const FormValidation = { 
  required,
  validEmail,
  minLength,
  maxLength,
  emailExists,
  between,
  password
}

export default FormValidation;
export { required, validEmail, between, password, minLength, maxLength, emailExists }