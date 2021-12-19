const { ApolloServer } = require("apollo-server-express");
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const db = require('./config/connection');
const { typeDefs, resolvers } = require('./schemas/index.js');
const { authMiddleware } = require('./utils/index.js');