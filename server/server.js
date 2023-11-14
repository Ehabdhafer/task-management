const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
app.use(express.json());
const cors = require("cors");
app.use(cors());

mongoose
  .connect(process.env.CONNECT)
  .then(() => {
    console.log(`connected successfully`);
  })
  .catch((err) => {
    console.log(`error with connecting with DB`, err);
  });

const taskrouter = require("./routes/task_route");
const userrouter = require("./routes/user_route");

app.use(taskrouter);
app.use(userrouter);

app.listen(5000, () => {
  console.log("Listening to 5000");
});
