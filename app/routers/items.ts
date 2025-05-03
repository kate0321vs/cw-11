import express from "express";
import Item from "../models/Item";
import auth, {RequestWithUser} from "../middleware/auth";
import mongoose from "mongoose";

const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res) => {
    try {
        const {category} = req.query;
        let items;
        if (category) {
            items = await Item.find({category});
        } else {
            items = await Item.find()
        }
        res.send(items);
    } catch (e) {
        res.status(500).send(e);
    }
});

itemsRouter.post("/", auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const newItem = new Item({
            title: req.body.title,
            description: req.body.description,
            image: req.file ? 'images/' + req.file.filename : null,
            price: req.body.price,
            category: req.body.category,
            user: user._id,
        });
        await newItem.save();
        res.send(newItem);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            res.status(400).send(e.message)
        }
        next(e)
    }
})

itemsRouter.delete("/:id", auth, async (req, res) => {
    try {
        const user = (req as RequestWithUser).user;
        const item = await Item.findOne({_id: req.params.id});
        if (!item) {
            res.status(404).send({error: "Item not found"});
            return;
        }

        if (item.user.toString() !== user._id.toString()) {
            res.status(403).send({error: "Not have permission to delete this item"});
            return;
        }

        await item.deleteOne();
        res.send({message: "Item deleted"})
    } catch (e) {
        res.status(500).send(e);
    }
})


export default itemsRouter;