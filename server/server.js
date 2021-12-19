const { ApolloServer } = require("apollo-server-express");
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas/index.js');
const { authMiddleware } = require('./utils/index.js');

console.log('This is the server file');

const server = new ApolloServer(
    {
        typeDefs,
        resolvers,
        context: authMiddleware
    }
)

const app = express()
const PORT = process.env.PORT || 3001;

