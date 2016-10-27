'use strict';
const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');

const OrderQueries = require('./order/queries');
const SentimentReportQueries = require('./sentiment-report/queries');
const StockQueries = require('./stock/queries');

const queries = Object.assign({}, OrderQueries, SentimentReportQueries, StockQueries);

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: queries
    })
});

module.exports = schema;
