import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// try {
//   mongoose.connect(process.env.MONGO_CONNECTION_STRING!).then(() => {
//     console.log("Mongoose connected");
//     app.listen(port, () => {
//       console.log(`Server running on port: ${port}`);
//     });
//   });
// } catch (error) {
//   console.error("Error connecting to MongoDB:", error);
// }

// module.exports = app;

mongoose.connect(process.env.MONGO_CONNECTION_STRING!).then(() => {
  console.log("Mongoose connected");
  app.listen(port, () => {
    console.log(`Server runnin on port: ${port}`);
  });
});
