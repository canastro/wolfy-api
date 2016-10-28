// README: https://www.reindex.io/blog/relay-graphql-pagination-with-mongodb/

const { ObjectId } = require('mongodb');

exports.getFilter = (symbol, before, after, order) => {
    const filter = { _id: {}, symbol };

    if (before) {
        const op = order === 1 ? '$lt' : '$gt';
        filter._id[op] = ObjectId(before.value);
    }

    if (after) {
        const op = order === 1 ? '$gt' : '$lt';
        filter._id[op] = ObjectId(after.value);
    }

    return Object.keys(filter._id).length ? filter : { symbol };
};

exports.applyPagination = (query, count, first, last) => {
    if (first || last) {
        let limit;
        let skip;

        if (first && count > first) {
            limit = first;
        }

        if (last) {
            if (limit && limit > last) {
                skip = limit - last;
                limit = limit - skip;
            } else if (!limit && count > last) {
                skip = count - last;
            }
        }

        if (skip) {
            query.skip(skip);
        }

        if (limit) {
            query.limit(limit);
        }
    }

    return {
        query,
        hasNextPage: Boolean(first && count > first),
        hasPreviousPage: Boolean(last && count > last),
    };
};
