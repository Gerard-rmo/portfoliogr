import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  imageURL: {
    type: {
      public_id: String,
      url: String
    },
    required: true
  },
  categorie: {
    type: String,
    required: true,
    enum: ['salon', 'presse', 'skate'] 
  }
});

const Photo = mongoose.model("Photo", photoSchema);
export default Photo;
