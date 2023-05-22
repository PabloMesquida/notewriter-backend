import "dotenv/config";
import express from "express";
import NoteModel from "./models/note";
//import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";

const port = env.PORT;

mongoose
  .connect(env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log(`Server runnin on port: ${port}`);
    });
  })
  .catch(console.error);

const app = express();

app.get("/", async (req, res) => {
  const notes = await NoteModel.find().exec();
  res.status(200).json(notes);
});

module.exports = app;
