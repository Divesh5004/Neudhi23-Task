const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolver = require('./resolvers');

const server = new ApolloServer({ typeDefs, resolvers: resolver });

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});