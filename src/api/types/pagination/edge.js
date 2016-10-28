const {
    GraphQLObjectType,
} = require('graphql');
const Cursor = require('./cursor');

module.exports = (name, type) => new GraphQLObjectType({
    name: name,
    fields: () => ({
        cursor: {
            type: Cursor,
            resolve: (parent) => ({ value: parent._id.toString() })
        },
        node: {
            type: type,
            resolve: (parent) => parent
        },
    }),
});
