import { GraphQLScalarType } from 'graphql';
import { Base64 } from 'js-base64';
import { Kind } from 'graphql/language';

export function toCursor(value) {
  return Base64.encode(value.toString());
}

export function fromCursor(value) {
  return Base64.decode(value);
}

const CursorType = new GraphQLScalarType({
  name: "Cursor",
  serialize(value) {
    return toCursor(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return fromCursor(ast.value);
    } else {
      return null;
    }
  },
  parseValue(value) {
    return fromCursor(value);
  },

})

export default CursorType;