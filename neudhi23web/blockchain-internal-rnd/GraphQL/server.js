const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);



app.listen(3000, () => {
  console.log('GraphQL server is running on http://localhost:3000/graphql');
});
