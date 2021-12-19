const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Streamer {
        _id: ID
        streamername: String
        email: String
        firstName: String
        lastName: String
        image: String
    }

    type Auth {
        token: ID!
        streamer: Streamer
    }

    type Comment {
        author: Streamer
        title: String
        body: String!
    }

    type Video {
        _id: ID
        title: String
        description: String
        watchers: Int
        length: Float
        source: String
        image: String
        comments: [Comment]
        streamingService: StreamingService
    }

    input VideoContent {
        title: String
        watchers: Int
        length: Float!
        description: String
        source: String
        image: String
    }

    type Query {
        streamer(_id: String): Streamer
        video(_id: ID): Video
        videos: [Video]
        authVideosReq: [Video]
        me: Streamer
    }

    type Mutation {
        createVideo(title: String!, description: String!, source: String, image: String): Video
        newStreamer(streamername: String!, password: String!, email: String!, firstName: String!, lastName: String!, image: String): Auth
        login(streamername: String!, password: String!): Auth
        addComment(body: String!, videoId: ID!): Video
        addWatcher(videoId: ID!): Streamer
    }
`;

module.exports = typeDefs;