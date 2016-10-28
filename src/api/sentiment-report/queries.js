const {
    GraphQLString,
    GraphQLInt
} = require('graphql');

const SentimentReport = require('wolfy-models/src/schema/sentiment-report');

const { getFilter, applyPagination } = require('../utils/pagination');
const EdgeType = require('../types/pagination/edge');
const ConnectionType = require('../types/pagination/connection');
const Cursor = require('../types/pagination/cursor');

const SentimentReportType = require('../types/reports/sentiment');

function getReports({ symbol, first, last, before, after }, order) {
    const filter = getFilter(symbol, before, after, order);
    const query = SentimentReport.find(filter).sort([['_id', order]]);

    return SentimentReport.find(filter).count().then(count => {
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

const ReportEdge = EdgeType('ReportEdge', SentimentReportType);
const ReportConnection = ConnectionType('ReportConnection', ReportEdge);

module.exports = {
    sentimentreports: {
        type: ReportConnection,
        args: {
            first: { type: GraphQLInt },
            last: { type: GraphQLInt },
            before: { type: Cursor },
            after: { type: Cursor },
            symbol: { type: GraphQLString }
        },
        resolve: (parent, args) => getReports(args, -1)
    }
};
