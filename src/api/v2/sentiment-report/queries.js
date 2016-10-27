const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

const SentimentReport = require('wolfy-models/src/schema/sentiment-report');

const { getFilter, applyPagination } = require('../utils/pagination');
const ViewerType = require('../types/pagination/viewer');
const Cursor = require('../types/pagination/cursor');
const PageInfo = require('../types/pagination/page-info');
// const getProjection = require('../utils/get-projection');

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

const ReportEdge = new GraphQLObjectType({
    name: 'ReportEdge',
    fields: () => ({
        cursor: {
            type: Cursor,
            resolve: (parent) => ({ value: parent._id.toString() })
        },
        node: {
            type: SentimentReportType,
            resolve: (parent) => parent
        },
    }),
});

const ReportConnection = new GraphQLObjectType({
    name: 'ReportConnection',
    fields: () => ({
        edges: {
            type: new GraphQLList(ReportEdge),
            resolve: (parent) => parent.query
        },
        pageInfo: {
            type: new GraphQLNonNull(PageInfo),
        },
    }),
});

module.exports = {
    sentimentreports: {
        type: ViewerType(
            'reports',
            { symbol: { type: GraphQLString } },
            ReportConnection,
            getReports
        ),
        resolve: () => ({ id: 'VIEWER_ID' })
    }
};
