import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { ObjectId, Schema, Types } from "mongoose";
import config from "../config/config";
import creditCardSchema, { ICreditCard } from "./CreditCard";
import paginate from "./plugin/paginate.plugin";
import toJSON from "./plugin/toJSON.plugin";

export interface IUser {
  name: string;
  email: string;
  password: string;
  phone: number;
  address: string;
  avatarUrl: string;
  role: string;
  isDeleted: boolean;
  isEmailVerified: boolean;
  isResetPassword: Boolean;
  googleId: string;
  facebookId: string;
  creditCards: ICreditCard;
  cartId: ObjectId;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: Number },
    address: { type: String },
    avatarUrl: { type: String },
    role: {
      type: String,
      enum: Object.keys(config.role),
      default: config.role.user,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      unique: true,
    },
    facebookId: {
      type: String,
      unique: true,
    },
    creditCards: [creditCardSchema],

    cartId: {
      type: Types.ObjectId,
      ref: "Carts",
      require: true,
      unique: true,
    },
    isDeleted: { type: Boolean, default: false },
    isResetPassword: { type: Boolean, default: false },
  },
  {
    timestamps: true, //CreatedAt & UpdatedAt
  }
);

//plugin
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

userSchema.methods.generateToken = function () {
  const user = this;

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    config.jwt.secret as string,
    {
      expiresIn: config.jwt.accessExpiration,
    }
  );

  return accessToken;
};

userSchema.methods.filterOutputUser = function () {
  const obj = this._doc;

  delete obj.__v;
  delete obj.password;
  delete obj.isDeleted;
  delete obj.isEmailVerified;
  delete obj.createdAt;
  delete obj.updatedAt;

  return obj;
};

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("Users", userSchema);
export default User;
