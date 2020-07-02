const mongoose = require("mongoose");
// const { schema } = require("./user");
const Tag = require("./tag");

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
    },
    duration: {
      type: Number,
      required: true,
    },
    groupS: {
      type: Number,
    },
    country: { type: String },
    description: {
      type: String,
      trim: true,
      mixlength: 5,
      maxlength: 500,
    },
    // host: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
    tags: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
      },
    ],
    items: [{ type: String }],
    pictureURL: [{ type: String }],
    price: { type: Number, default: 0 },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    nRating: {
      type: Number,
      default: 0,
    },
    age: {
      type: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObjectL: { virtuals: true },
  }
);

module.exports = mongoose.model("Experiences", Schema);
