import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  Name: String,
  Roll: Number,
  Email: String,
  GuardianName: String,
  Contact: Number,
  Photo: { data: Buffer, contentType: String },
});

const Post = mongoose.model("Post", postSchema);

export default Post;
