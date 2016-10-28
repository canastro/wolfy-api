const {
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'Stock',
    fields: {
        _id: { type: GraphQLString },
        symbol: { type: GraphQLString },
        name: { type: GraphQLString }
    }
});
