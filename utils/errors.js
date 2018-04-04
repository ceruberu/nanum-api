import { GraphQLError } from 'graphql';

class NanumError extends GraphQLError {
  constructor(errors) {
    super('The request is invalid');
    this.name = this.constructor.name;

    this.state = errors.reduce((result, error) => {
      if (Object.prototype.hasOwnProperty.call(result, error.key)) {
        result[error.key].push(error.message);
      } else {
        result[error.key] = [error.message];
      }
      return result;
    }, {});
  }
};

export class DatabaseError extends NanumError {
  constructor(errors) {
    super(errors);
  }
};

export class ServerError extends NanumError {
  constructor(errors) {
    super(errors);
  }
};

export class ClientError extends NanumError {
  constructor(errors) {
    super(errors);
  }
};

export class ValidationError extends NanumError {
  constructor(errors) {
    super(errors);
  }
}