const moment = require('moment');
const {
    GraphQLString,
    GraphQLList
} = require('graphql');

const Price = require('wolfy-models/src/schema/price');
const PriceType = require('../types/prices/price');
const getProjection = require('../utils/get-projection');

module.exports = {
    prices: {
        type: new GraphQLList(PriceType),
        args: {
            since: {
                name: 'since',
                type: GraphQLString
            },
            until: {
                name: 'until',
                type: GraphQLString
            },
            symbol: {
                name: 'symbol',
                type: GraphQLString
            }
        },
        resolve(parent, args, context, info) {
            const projection = getProjection(info);
            const filter = {
                symbol: args.symbol
            };
            const dateFilter = {};

            if (args.since) {
                dateFilter['$gte'] = moment(+args.since).toDate().toISOString();
            }

            if (args.until) {
                dateFilter['$lte'] = moment(+args.until).toDate().toISOString();
            }

            if (Object.keys(dateFilter)) {
                filter.date = dateFilter;
            }

            return Price.find(filter).sort('date').select(projection).exec();
        }
    }
};
