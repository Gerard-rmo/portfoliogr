import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  imageURL: { type: String, required: true },
  categorie: {
    type: String,
    enum: ["salon", "skate", "presse"],
    required: true,
  },
});

const Photo = mongoose.model("Photo", photoSchema);
export default Photo;
