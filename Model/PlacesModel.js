let mongoose = require("mongoose");

let PlaceSchema = new mongoose.Schema(
  {
    place: {
      type: String,
      required: true,
      unique: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
      unique: false,
    },
    state: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

let PlaceModel = new mongoose.model("place", PlaceSchema);
module.exports = PlaceModel;
