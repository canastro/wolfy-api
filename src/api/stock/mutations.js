const {
    GraphQLID,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');

const Stock = require('wolfy-models/src/schema/stock');
const StockType = require('../types/stock');
const StockInputType = require('../types/stock-input');

const getProjection = require('../utils/get-projection');

module.exports = {
    addStock: {
        type: GraphQLBoolean,
        args: {
            data: {
                name: 'data',
                type: new GraphQLNonNull(StockInputType)
            }
        },
        resolve(parent, args) {
            const stock = new Stock(args.data);
            return stock.save().then(() => true).catch(() => false);
        }
    },

    removeStock: {
        type: StockType,
        args: {
            _id: {
                name: '_id',
                type: new GraphQLNonNull(GraphQLID)
            }
        },
        resolve(parent, args, context, info) {
            const projection = getProjection(info);

            return Stock.findByIdAndRemove({ _id: args._id }).select(projection).exec();
        }
    }
};
