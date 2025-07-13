const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar Date

  type User {
    _id: ID!
    name: String!
    email: String!
    phone: String!
    address: String!
    role: String!
  }
  type Pet {
    _id: ID!
    name: String!
    species: String!
    breed: String!
    dob: Date!
    gender: String!
    allergies: [String]
    owner: User
    vet: User
  }

  type Query {
    viewPets: [Pet]
  }
`;

module.exports = typeDefs;
