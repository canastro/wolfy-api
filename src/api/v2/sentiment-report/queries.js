const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList
} = require('graphql');

const GraphQLDate = require('graphql-date');

const SentimentReport = require('wolfy-models/src/schema/sentiment-report');

const getProjection = require('../utils/get-projection');

const SentimentReportType = new GraphQLObjectType({
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

module.exports = {
    sentimentreports: {
        type: new GraphQLList(SentimentReportType),
        args: {
            symbol: {
                name: 'symbol',
                type: GraphQLString
            }
        },
        resolve(parent, args, context, info) {
            const projection = getProjection(info);
            return SentimentReport.find({ symbol: args.symbol }).select(projection).exec();
        }
    }
};
