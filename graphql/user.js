export default `
  type User {
    _id: ID!
    display_name: String!
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

  input LocalLoginInput {
    email: String!
    password: String!
  }
`;