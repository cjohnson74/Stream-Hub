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

    type Comment {
        author: Streamer
        title: String
        body: String!
    }

    type Query {
        streamer(_id: String): Streamer
    }
`;

module.exports = typeDefs;