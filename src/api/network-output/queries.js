const moment = require('moment');
const {
    GraphQLString,
    GraphQLList
} = require('graphql');

const NetworkOutput = require('wolfy-models/src/schema/network-output');
const NetworkOutputType = require('../types/network/output');
const getProjection = require('../utils/get-projection');

module.exports = {
    networkOutputs: {
        type: new GraphQLList(NetworkOutputType),
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
                filter.createdAt = dateFilter;
            }

            return NetworkOutput.find(filter).sort('date').select(projection).exec();
        }
    }
};
