'use strict';
const {
    GraphQLSchema,
    GraphQLObjectType
} = require('graphql');

const OrderQueries = require('./order/queries');
const SentimentReportQueries = require('./sentiment-report/queries');
const PriceQueries = require('./price/queries');
const StatisticsQueries = require('./statistics/queries');

const StockQueries = require('./stock/queries');
const StockMutations = require('./stock/mutations');

const queries = Object.assign(
    {}, StatisticsQueries, OrderQueries, SentimentReportQueries, StockQueries, PriceQueries
);
const mutations = Object.assign({}, StockMutations);

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: queries
    }),
    mutation: new GraphQLObjectType({
        name: 'Mutation',
        fields: mutations
    })
});

module.exports = schema;
