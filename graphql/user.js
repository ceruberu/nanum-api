const User = `
  type User {
    id: ID!
    username: String!
    email: String!
    email_verified: Boolean!
    created_at: DateTime!
    donates: [Item]
    donates_count: Int!
    receives: [Item]
    receives_count: Int!
  }

  input UserInput {
    username: String!
  }
`;

export default User;