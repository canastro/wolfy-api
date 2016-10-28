const {
    GraphQLInputObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLInputObjectType({
    name: 'StockInput',
    fields: {
        symbol: { type: GraphQLString },
        name: { type: GraphQLString }
    }
});
