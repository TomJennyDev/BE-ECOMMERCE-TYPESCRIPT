import mongoose, { Schema } from "mongoose";
import paginate from "./plugin/paginate.plugin";

interface IAtribute {
  title: string;
  parent: string;
  isDeleted: Boolean;
}

const attributeSchema = new Schema<IAtribute>(
  {
    title: { type: String, required: true },
    parent: { type: String, ref: "Attributes" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

attributeSchema.plugin(paginate);

const Attributes = mongoose.model("Attributes", attributeSchema);
export default Attributes;
