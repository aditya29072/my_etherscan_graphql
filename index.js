const { ApolloServer } = require("apollo-server"); 
// Import ApolloServer class from apollo-server package

const { importSchema } = require("graphql-import");
// Import importSchema function to load GraphQL schemas from graphql files

const EtherDataSource = require("./datasource/ethDatasource");
// Import custom EtherDataSource data source class 

const typeDefs = importSchema("./schema.graphql");
// Load GraphQL type definitions from schema.graphql file

require("dotenv").config(); 
// Load environment variables from .env file

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.etherBalanceByAddress(),
      // Resolver to call etherBalanceByAddress method on ethDataSource

    totalSupplyOfEther: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.totalSupplyOfEther(),
      // Resolver to call totalSupplyOfEther method on ethDataSource

    latestEthereumPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),
      // Resolver to call getLatestEthereumPrice method on ethDataSource

    blockConfirmationTime: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
      // Resolver to call getBlockConfirmationTime method on ethDataSource
  },
};


const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(), 
  }),
});

// Create ApolloServer instance, pass typeDefs, resolvers 
// and ethDataSource data source

server.timeout = 0;  
// Set server timeout to 0 (no timeout)

server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
// Start Apollo server on port 9000
