import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import Post from "./model/postSchema.js";
const port = process.env.PORT || 8000;
import cors from "cors";

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const respond = res.send("Server is ready");
    console.log(respond);
    res.status(200).json({ message: "Every thingis fine and responding" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error while starting server" });
  }
});

//api to send data from frontend to backend database
app.post("/create", async (req, res) => {
  try {
    const createdPost = await Post.create({
      Name: req.body.Name,
      Roll: req.body.Roll,
      Email: req.body.Email,
      GuardianName: req.body.GuardianName,
      Contact: req.body.Contact,
    });
    console.log(createdPost);
    res.status(201).json({ message: "Post created successfully." });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the post." });
  }
});

app.get("/students", async (req, res) => {
  try {
    const items = await Post.find();
    res.json(items);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the students." });
  }
});

//delete student data
app.delete("/delete/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete({ _id: req.params.id });
    console.log(deletedPost);
    res.status(200).json({ message: "Post deleted successfully." });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post." });
  }
});

//api to handle the update
app.put("/update/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        Name: req.body.Name,
        Roll: req.body.Roll,
        Email: req.body.Email,
        GuardianName: req.body.GuardianName,
        Contact: req.body.Contact,
      },
    );
    console.log(updatedPost);
    res.status(200).json({ message: "Post updated successfully." });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the post." });
  }
});

//start server at specified port
app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
