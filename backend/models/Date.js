import mongoose from "mongoose";

const SalonDateSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  lieu: {
    type: String,
    trim: true,
    required: true,
  },
});

export default mongoose.model("SalonDate", SalonDateSchema);
