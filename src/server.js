'use strict';

// Required by graffiti
require('babel-polyfill');

const cors = require('cors');
const winston = require('winston');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const json = require('body-parser').json;
const graffiti = require('@risingstack/graffiti');
const winstonDailyRotateFile = require('winston-daily-rotate-file');

const boot = require('./boot');
const WolfyModels = require('wolfy-models');

boot('mongodb://localhost/stocks', {
    env: 'development'
});

winston.add(winstonDailyRotateFile, {
    filename: 'log',
    levels: {
        trace: 0,
        debug: 1,
        info: 2,
        warn: 3,
        error: 4
    }
});

const app = express();

app.use(cors());
app.use(express.static(__dirname));
app.use(json());
app.use(graffiti.express({
    schema: WolfyModels.graffitiSchema,
    allowMongoIDMutation: false
}));

app.use('/graphqlv2', graphqlHTTP({
    schema: WolfyModels.graphQLSchema
}));

const port = process.env.PORT || 8080;

// START THE SERVER
app.listen(port);
winston.info(`Server started on ${port}`);
