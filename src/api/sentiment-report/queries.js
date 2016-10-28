const {
    GraphQLString
} = require('graphql');

const SentimentReport = require('wolfy-models/src/schema/sentiment-report');

const { getFilter, applyPagination } = require('../utils/pagination');
const ViewerType = require('../types/pagination/viewer');
const EdgeType = require('../types/pagination/edge');
const ConnectionType = require('../types/pagination/connection');

const SentimentReportType = require('../types/reports/sentiment');

const getQuery = (filter, order) => SentimentReport.find(filter).sort([['_id', order]]);

function getReports({ symbol, first, last, before, after }, order) {
    const filter = getFilter(symbol, before, after, order);
    const query = getQuery(filter, order);

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
const Viewer = ViewerType(
    'ReportViewer',
    'reports',
    { symbol: { type: GraphQLString } },
    ReportConnection,
    getReports
);

module.exports = {
    sentimentreports: {
        type: Viewer,
        resolve: () => ({ id: 'VIEWER_ID' })
    }
};
