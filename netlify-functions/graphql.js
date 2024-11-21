const { ApolloServer, gql } = require("apollo-server-lambda");

// Define GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true, // Enable GraphQL Playground for testing
  introspection: true, // Allow introspection
});

// Use Apollo's handler to handle Lambda requests
exports.handler = server.createHandler();
