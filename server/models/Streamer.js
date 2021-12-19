const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const StreamerSchema = new Schema(
  {
    streamername: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
      match: [/.+@.+\..+/, "Invalid, enter an e-mail address"],
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
      default:
        "https://pngset.com/images/red-play-button-sphere-purple-triangle-balloon-transparent-png-1586266.png",
    },
    watchedVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    watched: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true,
  }
);

StreamerSchema.pre("save", function (next) {
  if (this.password) {
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  }
});

StreamerSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Streamer = mongoose.model("User", UserSchema);

module.exports = Streamer;
