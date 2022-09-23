import { Schema } from "mongoose";
const toJSON = (schema: Schema) => {
  schema.methods.toJSON = function () {
    const user = this;

    const obj = user._doc;

    delete obj.__v;
    return obj;
  };
};

export default toJSON;
