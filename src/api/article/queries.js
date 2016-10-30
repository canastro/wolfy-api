const {
    GraphQLString,
    GraphQLInt
} = require('graphql');

const Article = require('wolfy-models/src/schema/article');

const { getFilter, applyPagination } = require('../utils/pagination');
const EdgeType = require('../types/pagination/edge');
const ConnectionType = require('../types/pagination/connection');
const Cursor = require('../types/pagination/cursor');

const ArticleType = require('../types/articles/article');

function getArticles({ symbol, type, first, last, before, after }, order) {
    const filter = getFilter(before, after, order, { symbol: symbol.toUpperCase(), type });
    const query = Article.find(filter).sort([['_id', order]]);

    return Article.find(filter).count().then(count => {
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

const ArticleEdge = EdgeType('ArticleEdge', ArticleType);
const ArticleConnection = ConnectionType('ArticleConnection', ArticleEdge);

module.exports = {
    articles: {
        type: ArticleConnection,
        args: {
            first: { type: GraphQLInt },
            last: { type: GraphQLInt },
            before: { type: Cursor },
            after: { type: Cursor },
            symbol: { type: GraphQLString },
            type: { type: GraphQLString }
        },
        resolve: (parent, args) => getArticles(args, -1)
    }
};
