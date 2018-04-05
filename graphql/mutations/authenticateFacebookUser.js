import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { secret } from '../../credentials.json';
const graphURL = (token) => `https://graph.facebook.com/v2.12/me?fields=id,email,picture&access_token=${token}`


export default async function (parentValue, { facebookToken }, req) {
  const usersCollection = req.app.get("db").collection("Users");

  // Verify Facebook's Access Token 
  const response = await fetch(graphURL(facebookToken)).catch(err=>{ throw err });
  const parsedResponse = await response.json().catch(err =>{ throw err });

  // Find User with such Facebook Id
  const user = await usersCollection.findOne({ 'facebookUserId': parsedResponse.id }).catch(err =>{ throw err });
  // If User Exist, return a token
  let token;
  if (user) {
    // Update Profile Picture if url changed
    // if (parsedResponse.data.picture.url !== user.pictureUrl) {
    //   const updatedUser = await usersCollection.updateOne({_id: user._id}, {$set: {pictureUrl = parsedREsponse.data.picture.url}})
    // }

    token = jwt.sign({
      userId: user._id 
    }, secret, { expiresIn: '7d' });
    return token;
  }

  // If User Doesn't  Exist, create a user and return a token
  const insertedUser = await usersCollection.insertOne({
    'username': null,
    'pictureUrl': parsedResponse.picture ? parsedResponse.picture.data.url : null,
    'facebookUserId': parsedResponse.id,
    'facebookEmail': parsedResponse.email || null,
    'isAuthenticated': false
  }).catch(err =>{ throw err });

  token = jwt.sign({
    'userId': insertedUser.ops[0]._id 
  }, secret, { expiresIn: '7d' });
  
  return token;
};