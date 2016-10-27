const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLID,
    GraphQLInt
} = require('graphql');

const Cursor = require('./cursor');
const defaultArgs = {
    first: {
        type: GraphQLInt,
    },
    last: {
        type: GraphQLInt,
    },
    before: {
        type: Cursor,
    },
    after: {
        type: Cursor,
    },
};

module.exports = (name, args = {}, Connection, callback) => new GraphQLObjectType({
    name: 'Viewer',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
        },
        [name]: {
            type: Connection,
            args: Object.assign({}, defaultArgs, args),
            resolve(parent, args) {
                return callback(args, -1);
            },
        },
    }),
});
