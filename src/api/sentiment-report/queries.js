const moment = require('moment');
const {
    GraphQLString,
    GraphQLList
} = require('graphql');

const SentimentReport = require('wolfy-models/src/schema/sentiment-report');
const SentimentReportType = require('../types/reports/sentiment');
const getProjection = require('../utils/get-projection');

module.exports = {
    sentimentreports: {
        type: new GraphQLList(SentimentReportType),
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
            },
            type: {
                name: 'type',
                type: GraphQLString
            }
        },
        resolve(parent, args, context, info) {
            const projection = getProjection(info);
            const filter = {
                symbol: args.symbol,
                type: args.type
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

            return SentimentReport.find(filter).sort('date').select(projection).exec();
        }
    }
};
