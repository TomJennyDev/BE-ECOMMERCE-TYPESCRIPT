import mongoose, { ObjectId, Schema, Types } from "mongoose";
import autoPopulate from "mongoose-autopopulate";
import slug from "mongoose-slug-updater";
import paginate from "./plugin/paginate.plugin";
import toJSON from "./plugin/toJSON.plugin";

export interface IProduct {
  sku: string;
  title: string;
  metaTitle: string;
  slug: string;
  imageUrls: string;
  status: string;
  inventoryStatus: string;
  price: number;
  tax: number;
  shipping: number;
  priceSale: number;
  discount: number;
  quantity: number;
  rateAverage: number;
  totalRatings: number;
  totalPurchases: number;
  descriptions: ObjectId | null;
  categoryId: ObjectId[];
  attributeId: ObjectId[];
  isDeleted: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    sku: { type: String },
    title: { type: String, require: true },
    metaTitle: { type: String },
    slug: { type: String, slug: ["_id", "title"] },
    imageUrls: [{ type: String }],
    status: {
      type: String,
      enum: ["sale", "new", "comming soon"],
    },
    inventoryStatus: { type: String, enum: ["out of stock", "available"] },
    price: { type: Number, require: true, default: 0, min: 0 },
    tax: { type: Number, default: 10 },
    shipping: { type: Number, default: 5 },
    priceSale: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    quantity: { type: Number, require: true, min: 0 },
    rateAverage: { type: Number, require: true, min: 0 },
    totalRatings: { type: Number, default: 0 },
    totalPurchases: { type: Number, default: 0 },
    descriptions: {
      type: Types.ObjectId,
      ref: "Descriptions",
      default: null,
    },
    categoryId: [{ type: Types.ObjectId, ref: "Categories" }],
    attributeId: [{ type: Types.ObjectId, ref: "Attributes" }],
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);
productSchema.plugin(toJSON);
productSchema.plugin(paginate);
productSchema.plugin(autoPopulate);
productSchema.plugin(slug);

productSchema.pre("save", function (next) {
  let product = this;

  //auto update status inventory
  if (product.quantity === 0) {
    product.inventoryStatus = "out of stock";
  } else {
    product.inventoryStatus = "available";
  }

  //auto calculate the price sale
  if (product.isModified("discount") || product.isModified("price")) {
    product.priceSale = parseFloat(
      (product.price - (product.discount * product.price) / 100).toFixed(1)
    );
  }

  next();
});

const Product = mongoose.model("Products", productSchema);
export default Product;
