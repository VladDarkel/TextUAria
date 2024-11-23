const { ApolloServer, gql } = require("apollo-server-lambda");
const Ably = require("ably");

// Ініціалізація Ably
const ably = new Ably.Realtime(import.meta.env.VITE_ABLY_API_KEY);
const channel = ably.channels.get("apollo-updates");

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
      const message2 = `Привіт, ${args.name}!`;

      // Надсилання повідомлення через Ably
      channel.publish("greetings", { message: message2 }, (err) => {
        if (err) {
          console.error("Помилка під час надсилання через Ably:", err);
        }
      });

      return message2;
    },
    whoiam: () => {
      return "Я розробник гри";
    },
    just: () => {
      channel.publish("just", { message: "Just2" });
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
