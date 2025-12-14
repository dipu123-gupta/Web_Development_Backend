const express = require('express');

const Auth=require("./auth")

const app = express();
app.use(express.json());

const foodMenu = [
    {
        id: 1,
        foodName: "Paneer Butter Masala",
        price: 220,
        category: "Veg"
    },
    {
        id: 2,
        foodName: "Chicken Curry",
        price: 250,
        category: "non-veg"
    },
    {
        id: 3,
        foodName: "Dal Tadka",
        price: 160,
        category: "Veg"
    },
    {
        id: 4,
        foodName: "Veg Biryani",
        price: 180,
        category: "Veg"
    },
    {
        id: 5,
        foodName: "Chicken Biryani",
        price: 260,
        category: "non-veg"
    },
    {
        id: 6,
        foodName: "Jeera Rice",
        price: 120,
        category: "Veg"
    },
    {
        id: 7,
        foodName: "Butter Naan",
        price: 40,
        category: "Veg"
    },
    {
        id: 8,
        foodName: "Garlic Naan",
        price: 50,
        category: "Veg"
    },
    {
        id: 9,
        foodName: "Tandoori Roti",
        price: 30,
        category: "non-veg"
    },
    {
        id: 10,
        foodName: "Veg Momos",
        price: 90,
        category: "Snacks"
    },
    {
        id: 11,
        foodName: "Chicken Momos",
        price: 120,
        category: "non-veg"
    },
    {
        id: 12,
        foodName: "Samosa",
        price: 20,
        category: "Snacks"
    },
    {
        id: 13,
        foodName: "French Fries",
        price: 100,
        category: "Snacks"
    },
    {
        id: 14,
        foodName: "Cold Drink",
        price: 50,
        category: "Beverages"
    },
    {
        id: 15,
        foodName: "Lassi",
        price: 70,
        category: "Beverages"
    },
    {
        id: 16,
        foodName: "Tea",
        price: 20,
        category: "Beverages"
    },
    {
        id: 17,
        foodName: "Coffee",
        price: 30,
        category: "Beverages"
    },
    {
        id: 18,
        foodName: "Gulab Jamun",
        price: 60,
        category: "Dessert"
    },
    {
        id: 19,
        foodName: "Ice Cream",
        price: 80,
        category: "Dessert"
    },
    {
        id: 20,
        foodName: "Rasgulla",
        price: 70,
        category: "Dessert"
    }
];


//! Authenticate Admin hare
// app.use("/admin",Auth)

//! food manu ko koi bhi access kar sakta hai
app.get('/food',Auth, (req, res) => {
    res.send(foodMenu)
})

// ! item ko only admin hi add kar sakata hai  
app.post("/admin",Auth, (req, res) => {
    //Add item into food manu
    // Authentication karna padega ki kya ye admin hi hai nahi
    // dummy code 
    // const token = "ABCDEF";
    // const Access = token === "ABCDEF" ? 1 : 0;
    // if (Access) {

        foodMenu.push(req.body);
        res.send("Item Add successfully");

    // } else {
    //     res.send("Item can't be added ")
    // }
})
// ! only admin hi delete kar sakata hai item ko
app.delete('/delete',Auth, (req, res) => {
    //Add item into food manu
    // Authentication karna padega ki kya ye admin hi hai nahi
    // dummy code 
    // const token = "ABCDEF";
    // const Access = token === "ABCDEF" ? 1 : 0;
    // if (Access) {
        const id = parseInt(req.params.id)
        const index = foodMenu.findIndex(item => item.id === id)

        if (index === -1) {
            res.send("item dose not present")
        } else {
            res.send("Item deleted successfully")
        }
    // } else {
    //     res.send("No permission")
    // }
})


// ! only admin item ko edite kar sakta hai or koi nahi hai
app.patch("/admin",Auth, (req, res) => {
    //Add item into food manu
    // Authentication karna padega ki kya ye admin hi hai nahi
    // dummy code 
    // const token = "ABCDEF";
    // const Access = token === "ABCDEF" ? 1 : 0;
    // if (Access) {
        const id = req.params.id;
        const foodData = foodMenu.find(item => item.id === id);

        if (foodData) {
            if (req.body.foodName) {
                foodData.foodName = req.body.foodName;
            }
            if (req.body.price) {
                foodData.price = req.body.price;
            }
            if (req.body.category) {
                foodData.category = req.body.category;
            }
            res.send("Item Updated")
        // } else {
        //     res.send("item not exist")
        // }
    }
})



app.listen(3000, () => {
    console.log("Server running on port number: 3000");

})

