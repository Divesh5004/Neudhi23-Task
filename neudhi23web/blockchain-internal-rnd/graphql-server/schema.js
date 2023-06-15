const { gql } = require('apollo-server');

const typeDefs = gql`
  type Token {
    id: ID!
    name: String!
    symbol: String!
    totalSupply: Float!
  }

  type TransferEvent {
    from: String!
    to: String!
    value: Float!
  }

  type Query {
    getToken(id: ID!): Token
  }

  type Subscription {
    transferEvents: TransferEvent
  }
`;

module.exports = typeDefs;
