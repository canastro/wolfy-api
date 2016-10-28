const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLFloat,
    GraphQLInt
} = require('graphql');
const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'Price',
    fields: {
        _id: { type: GraphQLString },
        symbol: { type: GraphQLString },
        date: { type: GraphQLDate },
        last: { type: GraphQLFloat },
        open: { type: GraphQLFloat },
        high: { type: GraphQLFloat },
        low: { type: GraphQLFloat },
        volume: { type: GraphQLInt },
        candle_color: { type: GraphQLString },
        candle_type: { type: GraphQLString }
    }
});
