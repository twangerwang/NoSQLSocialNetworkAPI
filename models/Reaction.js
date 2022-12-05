const { Schema, model } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //Use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Schema Settings:

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.

const Reaction = model("reaction", reactionSchema);
model.exports = Reaction;
