require('dotenv').config();
const express = require('express');
const GraphQLHTTP = require('express-graphql');
const bodyParser = require('body-parser');
const cors = require('cors');

const schema = require('./graphql');

// Load Environment Variables
const PROD = (process.env.NODE_ENV === 'production');
const PORT = (process.env.PORT || 8001);

// Create Express App
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Set Up GraphQL Endpoint
app.use('/api', GraphQLHTTP({
    schema,
    graphiql: !PROD,
}));

// Listen On Port
app.listen(PORT, err => {
    if (err)
        return console.error('Failed to connect: ', err);

    console.info('Server connected to localhost:8001!');
});
