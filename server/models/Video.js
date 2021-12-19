mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VideoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    streamingService: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "StreamingService",
    },
    length: {
      type: Number,
      required: true,
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
    comments: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Streamer",
        },
        body: {
          type: String,
        },
      },
    ],
    watchers: {
        type: Number,
        default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Video = mongoose.model('Video', VideoSchema);

module.exports = Video;
