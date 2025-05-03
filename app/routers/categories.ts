import express from "express";
import Category from "../models/Category";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (e) {
        res.status(500).send(e);
    }
});

export default categoriesRouter;