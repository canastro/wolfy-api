const {
    GraphQLString,
    GraphQLList
} = require('graphql');

const Rating = require('wolfy-models/src/schema/rating');
const RatingType = require('../types/ratings/rating');
const getProjection = require('../utils/get-projection');

module.exports = {
    ratings: {
        type: new GraphQLList(RatingType),
        args: {
            symbol: {
                name: 'symbol',
                type: GraphQLString
            }
        },
        resolve(parent, args, context, info) {
            const projection = getProjection(info);
            return Rating.find({ symbol: args.symbol }).select(projection).exec();
        }
    }
};
