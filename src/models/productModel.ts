import { Schema, model } from "mongoose";
import { generateUniqueRandomString } from "../utils/generateRandomNumber.js";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, "please product name is required "],
    },
    price: {
      type: Number,
      required: [true, "please provide product name "],
    },
    id: {
      type: String,
      require: true,
    },
    quantity: Number,
    createdBy: {
      userId: {
        type: Schema.ObjectId,
        required: true,
        ref: "User",
      },
      user: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
      required: [true, "please provide a product description"],
    },
    category: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
ProductSchema.pre("validate", async function (next) {
  this.id = await generateUniqueRandomString();
  
  next();
});
export default model("Product", ProductSchema);
