const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
} = require('graphql');

const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'SentimentReport',
    fields: {
        _id: { type: GraphQLString },
        symbol: { type: GraphQLString },
        type: { type: GraphQLString },
        date: { type: GraphQLDate },

        articles_sentiment: { type: GraphQLInt },
        articles_volume: { type: GraphQLInt },

        tweet_relative_sentiment: { type: GraphQLInt },
        tweet_absolute_sentiment: { type: GraphQLInt },
        tweet_volume: { type: GraphQLInt }
    }
});
