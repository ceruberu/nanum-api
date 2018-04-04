import validator from 'validator';

export function validateEmail(errors, email) {
  if(!validator.isEmail(email)) {
    errors.push({
      key: 'email',
      message: 'It is not a email address'
    })
  }
};

export function validateEmailInUse(erros, user) {
  if(user) {
    errors.push({
      key: 'email',
      message: 'The email already exists'
    })
  }
}  