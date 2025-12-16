// FoodStore.js

const express = require("express");
const Auth = require("./auth");

const app = express();
app.use(express.json());

// ---------------- FOOD DATA ----------------
const foodMenu = [
    { id: 1, foodName: "Paneer Butter Masala", price: 220, category: "Veg" },
    { id: 2, foodName: "Chicken Curry", price: 250, category: "non-veg" },
    { id: 3, foodName: "Dal Tadka", price: 160, category: "Veg" }
];

const addCart = [];

// ---------------- PUBLIC ROUTE ----------------
app.get("/food", (req, res) => {
    res.status(200).json(foodMenu);
});

// ---------------- ADMIN ROUTES ----------------

// Add item (admin only)
app.post("/admin/add", Auth, (req, res) => {
    foodMenu.push(req.body);
    res.send("Item added successfully");
});

// Delete item (admin only)
app.delete("/admin/delete/:id", Auth, (req, res) => {
    const id = Number(req.params.id);
    const index = foodMenu.findIndex(item => item.id === id);

    if (index === -1) {
        return res.send("Item not found");
    }

    foodMenu.splice(index, 1);
    res.send("Item deleted successfully");
});

// Update item (admin only)
app.patch("/admin/update/:id", Auth, (req, res) => {
    const id = Number(req.params.id);
    const item = foodMenu.find(item => item.id === id);

    if (!item) {
        return res.send("Item not found");
    }

    if (req.body.foodName) item.foodName = req.body.foodName;
    if (req.body.price) item.price = req.body.price;
    if (req.body.category) item.category = req.body.category;

    res.send("Item updated successfully");
});

// ---------------- USER CART ----------------

// Add to cart
app.post("/user/add/:id", (req, res) => {
    const id = Number(req.params.id);
    const item = foodMenu.find(item => item.id === id);

    if (!item) {
        return res.send("Item not available");
    }

    addCart.push(item);
    res.send("Item added to cart");
});

// Remove from cart
app.delete("/user/remove/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = addCart.findIndex(item => item.id === id);

    if (index === -1) {
        return res.send("Item not in cart");
    }

    addCart.splice(index, 1);
    res.send("Item removed from cart");
});

// View cart
app.get("/addtocart", (req, res) => {
    res.json(addCart);
});

// ---------------- SERVER ----------------
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
