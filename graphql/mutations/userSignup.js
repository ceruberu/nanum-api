import { GraphQLError } from 'graphql';
import { randomBytes } from 'crypto';
import { validateEmail, validateEmailInUse } from '../../utils/validators';
import { ValidationError, DatabaseError } from '../../utils/errors';

export default async (parentValue, { email }, req) => {
  console.log("USER SIGNUP REQUESTED");
  let errors = [];

  validateEmail(errors, email);

  const usersCollection = req.app.get("db").collection("Users");
  const user =  await usersCollection.findOne({ email });
  
  validateEmailInUse(errors, user);

  if (errors.length) throw new ValidationError(errors);

  const tokensCollection = req.app.get("db").collection("Tokens");

  const newUser = { 
    email, 
    email_verified: false,
    verification_token: verificationToken
  };
  try {
    const newUser = await usersCollection.insertOne(query);
    
    const tokenObj = {
      _userId: newUser._id,
      createdAt: new Date(),
      token: randomBytes(16).toString('hex')
    };

    const token = await tokensCollection.insertOne(tokenObj);
    
    console.log("USER CREATED:", newUser);
    return newUser;
  } catch (err) {
    errors.push({
      key: "database",
      message: "Database is not working"
    });
    throw new DatabaseError(errors);
  }

};