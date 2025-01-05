import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});


const Project = mongoose.model("project", projectSchema);

export default Project;