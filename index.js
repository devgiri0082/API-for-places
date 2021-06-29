let express = require("express");
const mongoose = require("mongoose");
const {
  createPlace,
  getSpecificPlace,
  filterPlace,
} = require("./Controller/PlacesController");

let app = express();
const PORT = 3300;
app.use(express.json());
(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/placesdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})();
app.post("/add/", async (req, res) => {
  let response = await createPlace(req.body);
  res.status(response.code).json({ message: response.message });
  console.log(response);
});
app.get("/get/:slug", async (req, res) => {
  let response = await getSpecificPlace(req.params.slug);
  res.status(response.code).json({ message: response.message });
});

app.get("/filter", async (req, res) => {
  let response = await filterPlace(
    ...Object.keys(req.query),
    ...Object.values(req.query)
  );
  console.log(response);
  res.status(response.code).json({ message: response.message });
});
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
