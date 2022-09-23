import mongoose, { Model, ObjectId, Schema, Types } from "mongoose";
import { slug } from "mongoose-slug-updater";
import paginate from "./plugin/paginate.plugin";
import { treeModel } from "./plugin/tree.plugin";

interface ICategory {
  title: string;
  slug: string;
  icon: string;
  parent: ObjectId | null;
  isDeleted: boolean;
}

interface CategoryModel extends Model<ICategory> {
  getAllItem(): void;
  getChildItemById(): void;
}

const categorySchema = new Schema<ICategory, CategoryModel>(
  {
    title: { type: String },
    slug: { type: String, slug: ["title"] },
    icon: { type: String },
    parent: {
      type: Types.ObjectId,
      ref: "Categories",
      default: null,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

categorySchema.plugin(paginate);
categorySchema.plugin(slug);
categorySchema.plugin(treeModel);

const Category = mongoose.model<ICategory, CategoryModel>(
  "Categories",
  categorySchema
);
export default Category;
