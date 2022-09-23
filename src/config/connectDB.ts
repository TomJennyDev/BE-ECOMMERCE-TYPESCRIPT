import mongoose from "mongoose";
import config from "./config";

mongoose.Promise = global.Promise;

/* DB Connection */
mongoose
  .connect(config.mongoose.url)
  .then(() => {
    require("../createMock");

    console.log(`DB connected`);
  })
  .catch((err) => console.log(err));
