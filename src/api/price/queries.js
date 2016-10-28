const {
    GraphQLString,
    GraphQLInt
} = require('graphql');

const Price = require('wolfy-models/src/schema/price');

const { getFilter, applyPagination } = require('../utils/pagination');
const EdgeType = require('../types/pagination/edge');
const ConnectionType = require('../types/pagination/connection');
const Cursor = require('../types/pagination/cursor');

const PriceType = require('../types/prices/price');

function getPrices({ symbol, first, last, before, after }, order) {
    const filter = getFilter(symbol, before, after, order);
    const query = Price.find(filter).sort([['_id', order]]);

    return Price.find(filter).count().then(count => {
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

const PriceEdge = EdgeType('PriceEdge', PriceType);
const PriceConnection = ConnectionType('PriceConnection', PriceEdge);

module.exports = {
    prices: {
        type: PriceConnection,
        args: {
            first: { type: GraphQLInt },
            last: { type: GraphQLInt },
            before: { type: Cursor },
            after: { type: Cursor },
            symbol: { type: GraphQLString }
        },
        resolve: (parent, args) => getPrices(args, -1)
    }
};
