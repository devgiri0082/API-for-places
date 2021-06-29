let place = require("../Model/PlacesModel");

let createPlace = async ({ name: placeName, city, state }) => {
  console.log(placeName, city, state);
  let newPlace = new place({
    place: placeName,
    slug: `${placeName.split(" ").join("-")}${Date.now()}`,
    city: city,
    state: state,
  });
  try {
    await newPlace.save();
    return { code: 200, message: "New Place Saved Successfully" };
  } catch (err) {
    console.log(err);
    return { code: 500, message: err };
  }
};

let getSpecificPlace = async (slug) => {
  try {
    let givenPlace = await place.findOne({ slug: slug });
    if (givenPlace) {
      return { code: 200, message: givenPlace };
    }
    return {
      code: 400,
      message: "Given slug is not valid",
    };
  } catch (err) {
    console.log(err);
    return { code: 500, message: "internal server error" };
  }
};

let filterPlace = async (type, value) => {
  try {
    let filteredPlaces;
    if (type === "name") filteredPlaces = await place.find({ place: value });
    else if (type === "city")
      filteredPlaces = await place.find({ city: value });
    return { code: 200, message: filteredPlaces };
  } catch (err) {
    console.log(err);
    return { code: 500, message: "internal server error" };
  }
};

module.exports = { createPlace, getSpecificPlace, filterPlace };
