const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} = require('graphql');

const Stock = require('wolfy-models/src/schema/stock');
const Price = require('wolfy-models/src/schema/price');
const Tweet = require('wolfy-models/src/schema/tweet');
const Article = require('wolfy-models/src/schema/article');
const Rating = require('wolfy-models/src/schema/rating');
const Job = require('wolfy-models/src/schema/job');
const Order = require('wolfy-models/src/schema/order');
const SentimentReport = require('wolfy-models/src/schema/sentiment-report');

const StatisticsType = new GraphQLObjectType({
    name: 'Statistics',
    fields: {
        pricesCount: { type: GraphQLInt },
        stockCount: { type: GraphQLInt },
        tweetCount: { type: GraphQLInt },
        articleCount: { type: GraphQLInt },
        ratingCount: { type: GraphQLInt },
        jobCount: { type: GraphQLInt },
        orderCount: { type: GraphQLInt },
        sentimentReportCount: { type: GraphQLInt }
    }
});

module.exports = {
    statistics: {
        type: StatisticsType,
        args: {
            symbol: {
                name: 'symbol',
                type: GraphQLString
            }
        },
        resolve(parent, args) {
            const filter = args.symbol ? { symbol: args.symbol.toUpperCase() } : {};

            const promises = [];
            promises.push(Price.count(filter));
            promises.push(Stock.count(filter));
            promises.push(Tweet.count(filter));
            promises.push(Article.count(filter));
            promises.push(Rating.count(filter));
            promises.push(Job.count(filter));
            promises.push(Order.count(filter));
            promises.push(SentimentReport.count(filter));

            return Promise.all(promises).then((result) => {
                return {
                    pricesCount: result[0],
                    stockCount: result[1],
                    tweetCount: result[2],
                    articleCount: result[3],
                    ratingCount: result[4],
                    jobCount: result[5],
                    orderCount: result[6],
                    sentimentReportCount: result[7]
                };
            });
        }
    }
};
