mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        streamingService: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'StreamingService',
        },
        description: {
            type: String,
        },
        source: {
            type: String,
        },
        image: {
            type: String,
        },
        comments: [{
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Streamer",
            },
            body: {
                type: String
            }
        }],
    },
    {
        timestamps: true,
    }
)