const {
    GraphQLString,
    GraphQLList
} = require('graphql');

const Stock = require('wolfy-models/src/schema/stock');
const StockType = require('../types/stock');
const getProjection = require('../utils/get-projection');

module.exports = {
    stocks: {
        type: new GraphQLList(StockType),
        args: {},
        resolve(parent, args, context, info) {
            const projection = getProjection(info);
            return Stock.find().select(projection).exec();
        }
    },
    stock: {
        type: StockType,
        args: {
            id: {
                name: 'id',
                type: GraphQLString
            }
        },
        resolve(parent, args, context, info) {
            const projection = getProjection(info);
            return Stock.find({ _id: args.id }).select(projection).exec();
        }
    }
};
