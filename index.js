const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

app.listen(process.env.PORT, () => {
  console.log(`listening to port no ${process.env.PORT}`);
});
