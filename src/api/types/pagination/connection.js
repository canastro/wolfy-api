const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const PageInfo = require('./page-info');

module.exports = (name, edge) => new GraphQLObjectType({
    name: name,
    fields: () => ({
        edges: {
            type: new GraphQLList(edge),
            resolve: (parent) => parent.query
        },
        pageInfo: {
            type: new GraphQLNonNull(PageInfo),
        },
    }),
});
