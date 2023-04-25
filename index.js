const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
// const userpath = require("./routes/users");
const listRoute = require("./routes/lists");
const likeRoute = require("./routes/like");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => console.log(err));

app.use(express.json());

//Routes
app.use("/api/auth", authRoute);


app.use("/api/list", listRoute);
app.use("/api/like", likeRoute);

app.listen(8800, () => {
  console.log("Backend Server is Running");
});
