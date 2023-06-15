const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Divesh',
    fields: {
      message: {
        type: GraphQLString,
        resolve: () => 'Divesh',
      },
    },
  }),
});

module.exports = schema;
