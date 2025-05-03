import {model, Schema, Types} from "mongoose";
import Category from "./Category";
import User from "./User";

const ItemSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const category = await Category.findById(value);
                return !!category;
            },
            message: "Category not found",
        }
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                const user = await User.findById(value);
                return !!user;
            },
            message: "User not found",
        }
    }
});

const Item = model("Item", ItemSchema);
export default Item;