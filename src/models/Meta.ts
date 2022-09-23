import mongoose, { ObjectId, Schema, Types } from "mongoose";
import paginate from "./plugin/paginate.plugin";

interface IMetas {
  key: string;
  content: string;
  productId: ObjectId;
  isDeleted: boolean;
}

const metaSchema = new Schema<IMetas>(
  {
    key: { type: String, require: true, unique: true },
    content: { type: String, require: true },
    productId: {
      type: Types.ObjectId,
      required: true,
      ref: "Products",
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

metaSchema.plugin(paginate);

const Meta = mongoose.model("Metas", metaSchema);
export default Meta;
