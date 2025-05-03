import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Category from "./models/Category";
import Item from "./models/Item";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try {
        await db.dropCollection("users");
        await db.dropCollection("categories");
        await db.dropCollection("items");
    } catch (e) {
        console.log("Collections were not present, skipping drop...");
    }

    const [User1, User2] = await User.create({
        username: "user",
        password: "password",
        displayName: "Jack Miller",
        phoneNumber: "12345678",
        token: crypto.randomUUID()
    }, {
        username: "user_2",
        password: "password",
        displayName: "Sophia Green",
        phoneNumber: "987654321",
        token: crypto.randomUUID()
    });

   const [Category1, Category2, Category3] = await Category.create({
       name: "Home & Living"
   },{
       name: "Beauty & Self-Care"
   }, {
       name: "Kids & Toys"
   });

   await Item.create({
       title: "Wall Clock",
       description: "Modern silent wall clock with a minimalist design, ideal for any interior.",
       image: "fixtures/wall-clock.jpg",
       price: 30,
       category: Category1,
       user: User1,
   },{
       title: "Decorative LED String Lights",
       description: "Warm white string lights for cozy atmosphere in any room.",
       image: "fixtures/ledLamps.jpg",
       price: 25,
       category: Category1,
       user: User1,
   }, {
       title: "Hand Cream with Shea Butter",
       description: "Nourishing hand cream for dry skin with a subtle floral scent.",
       image: "fixtures/handCream.jpg",
       price: 16,
       category: Category2,
       user: User1,
   }, {
       title: "Natural Lip Balm",
       description: "Hydrating lip balm made with natural oils and a refreshing mint scent.",
       image: "fixtures/lipBalm.jpg",
       price: 12,
       category: Category2,
       user: User2,
   },{
       title: "Wooden Puzzle",
       description: "Colorful educational puzzle for toddlers to learn shapes and animals.",
       image: "fixtures/woodenPuzzle.jpg",
       price: 20,
       category: Category3,
       user: User2,
   }, {
       title: "Bubble Blower Gun with Lights",
       description: "Automatic bubble gun with colorful lights — fun for outdoor play.",
       image: "fixtures/bubbleGun.jpg",
       price: 20,
       category: Category3,
       user: User2,
   })

    await db.close()
};

run().catch(console.error);