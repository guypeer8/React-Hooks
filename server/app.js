require('dotenv').config();
const express = require('express');
const GraphQLHTTP = require('express-graphql');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const gqlSchema = require('./graphql');
const dataLoaders = require('./dataloaders');

// Load Environment Variables
const PROD = (process.env.NODE_ENV === 'production');
const PORT = (process.env.PORT || 8001);

// Create Express App
const app = express();

// External Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

// Internal Middleware
app.use(require('./routes/jwt'));

// Set Up GraphQL Endpoint
app.use('/api',
    GraphQLHTTP((req, res) => ({
        schema: gqlSchema,
        context: {
            res,
            user: req.jwtDecoded,
            dataLoaders,
        },
        graphiql: !PROD,
    })),
);

// Listen On Port
app.listen(PORT, err => {
    if (err)
        return console.error('Failed to connect: ', err);

    console.info('Server connected to localhost:8001!');
});
