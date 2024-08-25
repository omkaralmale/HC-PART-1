import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const user_schema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    full_name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String, // url
      required: true,
    },
    cover_image: {
      type: String, // url
      required: true,
    },
    watch_history: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refresh_token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

user_schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hash(this.password, 10);
  }
  next();
});

user_schema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

user_schema.methods.generate_access_token = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      user_name: this.user_name,
      full_name: this.full_name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );
};
user_schema.methods.generate_refresh_token = async function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      user_name: this.user_name,
      full_name: this.full_name,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY_IN,
    }
  );
};

export const User = mongoose.model("User", user_schema);
