const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLList
} = require('graphql');

const GraphQLDate = require('graphql-date');

const Order = require('wolfy-models/src/schema/order');

const getProjection = require('../utils/get-projection');

const OrderType = new GraphQLObjectType({
    name: 'Order',
    fields: {
        _id: { type: GraphQLString },
        symbol: { type: GraphQLString },
        date: { type: GraphQLDate },
        amount: { type: GraphQLInt },
        value: { type: GraphQLFloat },
        type: { type: GraphQLString },
        isActive: { type: GraphQLBoolean }
    }
});

module.exports = {
    orders: {
        type: new GraphQLList(OrderType),
        args: {
            symbol: {
                name: 'symbol',
                type: GraphQLString
            }
        },
        resolve(parent, args, context, info) {
            const projection = getProjection(info);
            return Order.find({ symbol: args.symbol }).select(projection).exec();
        }
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
