'use strict';

// Required by graffiti
require('babel-polyfill');

const cors = require('cors');
const winston = require('winston');
const express = require('express');
const graphql = require('express-graphql');
const json = require('body-parser').json;
const winstonDailyRotateFile = require('winston-daily-rotate-file');

const boot = require('./boot');
const apiV2 = require('./api/v2');

const API_PORT = process.env.API_PORT || 8080;
const DB_NAME = process.env.DB_NAME || 'wolfy';

console.log('process.env.DB_NAME: ', process.env.DB_NAME);

boot(`mongodb://localhost/${DB_NAME}`, {
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
// app.use(graffiti.express({
//     schema: WolfyModels.graffitiSchema,
//     allowMongoIDMutation: false
// }));
//
// app.use('/graphqlv2', graphqlHTTP({
//     schema: WolfyModels.graphQLSchema
// }));

app.use('/api/v2', graphql({
    schema: apiV2
}));

// START THE SERVER
app.listen(API_PORT);
winston.info(`Server started on ${API_PORT}`);
