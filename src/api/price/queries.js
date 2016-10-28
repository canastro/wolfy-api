const {
    GraphQLString
} = require('graphql');

const Price = require('wolfy-models/src/schema/price');

const { getFilter, applyPagination } = require('../utils/pagination');
const ViewerType = require('../types/pagination/viewer');
const EdgeType = require('../types/pagination/edge');
const ConnectionType = require('../types/pagination/connection');

const PriceType = require('../types/prices/price');

const getQuery = (filter, order) => Price.find(filter).sort([['_id', order]]);

function getPrices({ symbol, first, last, before, after }, order) {
    const filter = getFilter(symbol, before, after, order);
    const query = getQuery(filter, order);

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
const Viewer = ViewerType(
    'PriceViewer',
    'prices',
    { symbol: { type: GraphQLString } },
    PriceConnection,
    getPrices
);

module.exports = {
    prices: {
        type: Viewer,
        resolve: () => ({ id: 'VIEWER_ID' })
    }
};
