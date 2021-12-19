const { AuthenticationError } = require('apollo-server-express');
const { Streamer, Comment } = require('../models/index');
const { signToken } = require('../utils/index');

const resolvers = {
    Query: {
        streamer: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Streamer.findOne(params).populate('createdComments');
        },
        comment: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return await Comment.findById(params)
                .populate('author')
                .populate('body');
        },
        me: async (parent, args, context) => {
            if (context.streamer) {
                return Streamer.findOne({ _id: context.streamer._id }).populate('createdComments').populate({ path: 'createdComments' });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
}