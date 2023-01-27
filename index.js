const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");

dotenv.config({ path: ".env" });
app.use(express.json());

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((cons) => {
    // console.log("MongoDb connected successfully Link:");
    console.log("database connected");
  })
  .catch((err) => {
    console.log("Database connection unsuccessful!", err);
  });

app.all("/", (req, res, next) => {
  res.json({
    message: "Hello client",
  });
});

app.use("/user", userRouter);

app.use((err, req, res, next) => {
  console.log(err);
});

app.listen(process.env.PORT, () => {
  console.log(`listening to port no ${process.env.PORT}`);
});
