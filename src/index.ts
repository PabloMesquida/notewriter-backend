import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

mongoose.connect(process.env.MONGO_CONNECTION_STRING!).then(() => {
  console.log("Mongoose connected");
  app.listen(port, () => {
    console.log(`Server runnin on port: ${port}`);
  });
});
