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

    type Query {
        streamer(_id: String): Streamer
    }

    type Mutation {
        newStreamer(streamername: String!, password: String!, email: String!, firstName: String!, lastName: String!, image: String): Auth
        login(streamername: String!, password: String!): Auth
    }
`;

module.exports = typeDefs;