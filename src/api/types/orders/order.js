const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean
} = require('graphql');

const GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'Order',
    fields: {
        _id: { type: GraphQLString },
        symbol: { type: GraphQLString },
        date: { type: GraphQLDate },
        amount: { type: GraphQLInt },
        value: { type: GraphQLFloat },
        type: { type: GraphQLString },
        isActive: { type: GraphQLBoolean }
    }
});
