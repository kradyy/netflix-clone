import React from 'react';
import validator from 'validator';

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

const emailExists = async (value) => {
  return 'Email already exists';
}
 
const lt = (value, props) => {
  // if (!value.toString().trim().length > props.maxLength) {
  //   return <span className="error">The value exceeded {props.maxLength} symbols.</span>
  // }
};
 
const password = (value, props, components) => {
  // Your password must contain between 4 and 60 characters.
  console.log(components)



  // NOTE: Tricky place. The 'value' argument is always current component's value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components['confirm'][0].value) { // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    return <span className="error">Passwords are not equal.</span>
  }
};

const FormValidation = { 
  required,
  validEmail,
  minLength,
  maxLength,
  emailExists,
  lt,
  between,
  password
}

export default FormValidation;
export { required, validEmail, lt, between, password, minLength, maxLength, emailExists }