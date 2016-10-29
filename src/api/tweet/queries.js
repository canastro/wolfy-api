const {
    GraphQLString,
    GraphQLInt
} = require('graphql');

const Tweet = require('wolfy-models/src/schema/tweet');

const { getFilter, applyPagination } = require('../utils/pagination');
const EdgeType = require('../types/pagination/edge');
const ConnectionType = require('../types/pagination/connection');
const Cursor = require('../types/pagination/cursor');

const TweetType = require('../types/tweets/tweet');

function getTweets({ symbol, type, first, last, before, after }, order) {
    const filter = getFilter(before, after, order, { symbol: symbol.toUpperCase(), type });
    const query = Tweet.find(filter).sort([['_id', order]]);

    return Tweet.find(filter).count().then(count => {
        const pageInfo = applyPagination(query, count, first, last);
        return pageInfo.query.exec().then((results) => ({
            query: results,
            pageInfo: {
                hasNextPage: pageInfo.hasNextPage,
                hasPreviousPage: pageInfo.hasPreviousPage
            }
        }));
    });
}

const TweetEdge = EdgeType('TweetEdge', TweetType);
const TweetConnection = ConnectionType('TweetConnection', TweetEdge);

module.exports = {
    tweets: {
        type: TweetConnection,
        args: {
            first: { type: GraphQLInt },
            last: { type: GraphQLInt },
            before: { type: Cursor },
            after: { type: Cursor },
            symbol: { type: GraphQLString },
            type: { type: GraphQLString }
        },
        resolve: (parent, args) => getTweets(args, -1)
    }
};
