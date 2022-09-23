import mongoose, { Schema } from "mongoose";
import paginate from "./plugin/paginate.plugin";

export interface ITag {
  title: string;
  slug: string;
  isDeleted: boolean;
}

const TagSchema = new Schema<ITag>(
  {
    title: { type: String },
    slug: { type: String },

    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

TagSchema.plugin(paginate);

const Tag = mongoose.model("Tags", TagSchema);

export default Tag;
