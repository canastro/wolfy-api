const {
    GraphQLInt,
    GraphQLString
} = require('graphql');

const Order = require('wolfy-models/src/schema/order');

const OrderType = require('../types/orders/order');
const { getFilter, applyPagination } = require('../utils/pagination');
const EdgeType = require('../types/pagination/edge');
const ConnectionType = require('../types/pagination/connection');
const Cursor = require('../types/pagination/cursor');

function getOrders({ symbol, first, last, before, after }, order) {
    const filter = getFilter(before, after, order, { symbol });
    const query = Order.find(filter).sort([['_id', order]]);

    return Order.find(filter).count().then(count => {
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

const OrderEdge = EdgeType('OrderEdge', OrderType);
const OrderConnection = ConnectionType('OrderConnection', OrderEdge);

module.exports = {
    orders: {
        type: OrderConnection,
        args: {
            first: { type: GraphQLInt },
            last: { type: GraphQLInt },
            before: { type: Cursor },
            after: { type: Cursor },
            symbol: { type: GraphQLString }
        },
        resolve: (parent, args) => getOrders(args, -1)
    },
    balance: {
        type: GraphQLInt,
        args: {
            symbol: {
                name: 'symbol',
                type: GraphQLString
            }
        },
        resolve(parent, args) {
            return Order.find({ symbol: args.symbol }).exec().then((orders) => {
                return orders
                    .map((item) => item.type === 'BUY' ? item.value * -1 : item.value)
                    .reduce((prev, cur) => prev + cur, 0);
            });
        }
    }
};
