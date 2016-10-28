const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLBoolean
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'PageInfo',
    fields: {
        hasNextPage: {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
        hasPreviousPage: {
            type: new GraphQLNonNull(GraphQLBoolean),
        },
    },
});
