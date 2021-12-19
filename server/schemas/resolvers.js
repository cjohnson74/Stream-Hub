const { AuthenticationError } = require('apollo-server-express');
const { Streamer, Comment } = require('../models/index');
const { signToken } = require('../utils/index');

const resolvers = {
    Query: {
        streamer: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return Streamer.findOne(params).populate('createdComments');
        },
        video: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return await Video.findById(params)
                .populate('streamingService')
                .populate('comments')
                .populate({path: 'comments', populate:{ path: 'author'}});
        },
        videos: async () => {
            return await Video.find({}).populate('streamingService').sort({watchers: -1});
        },
        authVideosReq: async (parent, args, context) => {
            if(!context.streamer){
                throw new AuthenticationError('You need to be logged in to request these Videos')
            }
            return await Video.find({});
        },
        // comment: async (parent, { _id }) => {
        //     const params = _id ? { _id } : {};
        //     return await Comment.findById(params)
        //         .populate('author')
        //         .populate('body');
        // },
        me: async (parent, args, context) => {
            if (context.streamer) {
                return Streamer.findOne({ _id: context.streamer._id }).populate('createdComments').populate({ path: 'createdComments' });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
    Mutation: {
        newStreamer: async (parent, args) => {
            const streamer = await Streamer.create(args);
            const token = signToken(streamer);
            return { token, streamer };
        },
        login: async (parent, { streamername, password }) => {
            const streamer = await Streamer.findOne({ streamername });

            if (!streamer) {
                throw new AuthenticationError('No user with this streamername found!');
            }

            const correctPw = await streamer.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect password!');
            }

            const token = signToken(streamer);
            return { token, streamer };
        },
        createVideo: async (parent, args, context) => {
            if (!context.streamer) {
                throw new AuthenticationError('You need to be logged in to chat (create a comment).');
            }

            const createVideo = async () => {
                const video = await Video.create({ ...args });
                let streamingServiceDocument = await StreamingService.findOne({ _id: args.streamingService._id });
                streamingServiceDocument.createdVideo.push(video._id);
                await streamingServiceDocument.save();
                return video;
            };

            return await createVideo();
        },
        addComment: async (parent, args, context) => {
            if (!context.user) {
                throw new AuthenticationError('You need to be logged in to chat about a video.');
            }

            let newComment = {
                author: context.user._id,
                body: args.body
            }

            let video = await Video.findById(args.videoId);

            video.comments.push(newComment);

            await video.save();

            return video;
        },
        addWatcher: async (parent, args, context) => {
            if (!context.streamer) {
                throw new AuthenticationError('You need to be logged in to view a video.');
            }
            let video = await Video.findById(args.videoId)
            video.likes++
            await video.save()
            let streamer = await Streamer.findById(context.streamer._id);
            streamer.watched.push(args.videoId);
            await streamer.save();

            return streamer;
        },
    }
};

module.exports = resolvers;