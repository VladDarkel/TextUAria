const { ApolloServer, gql } = require('apollo-server-lambda');

// 1. Визначте вашу схему GraphQL
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// 2. Створіть резолвери для вашої схеми
const resolvers = {
  Query: {
    hello: () => 'Hello from Netlify Functions!',
  },
};

// 3. Ініціалізуйте Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true, // Включити Playground для тестування запитів
  introspection: true, // Дозволити інтерпретацію схеми
});

// 4. Створіть функцію для обробки запитів
exports.handler = server.createHandler();

