const { ApolloServer, gql } = require("apollo-server-lambda");

const typeDefs = gql`
  type Query {
    greetings(name: String = "розробник"): String
    whoiam: String
    just: String
  }
`;

const resolvers = {
  Query: {
    greetings: (parent, args, context) => {
      return `Привіт, ${args.name}!`;
    },
    whoiam: () => {
      return "Я розробник гри";
    },
    just: () => {
      return "Just";
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const serverHandler = server.createHandler();

exports.handler = (event, context, callback) => {
  return serverHandler(
    {
      ...event,
      requestContext: event.requestContext || {},
    },
    context,
    callback
  );
};
