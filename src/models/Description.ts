import mongoose, { Schema } from "mongoose";
import paginate from "./plugin/paginate.plugin";
import toJSON from "./plugin/toJSON.plugin";

export interface IDescription {
  content: string;
  isDeleted: boolean;
}

const descriptionSchema = new Schema<IDescription>(
  {
    content: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);
descriptionSchema.plugin(toJSON);
descriptionSchema.plugin(paginate);

const Description = mongoose.model("Descriptions", descriptionSchema);
export default Description;
