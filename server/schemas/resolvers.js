const { AuthenticationError } = require('apollo-server-express');
const { Streamer, Comment } = require('../models/index');
const { signToken } = require('../utils/index');

