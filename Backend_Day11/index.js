const express = require('express');
const app = express();
const port = 3000;

const main = require('./dataBase');
const User = require('./model/user')

app.use(express.json());

//! CRUD: Create Read Update Delete
app.get("/info", async (req, res) => {
    try {
        const ans = await User.find({});
        res.send(ans);
    } catch (error) {
        res.send(error);
    }
});


app.post("/info", async (req, res) => {
    try {
        // const ans = new Usre(req.body);
        // await ans.save();

        await User.create(req.body);
        res.send("Updated Successfully");
    } catch (error) {
        res.send(error);
    }
});

app.delete("/info", async (req, res) => {
  try {
    await Usre.deleteOne({ name: "Dipu" });
    res.send("Deleted  Successfully");
  } catch (error) {
    res.send(error);
  }
});

app.put("/info", async (req,res)=>{
    const result = await Usre.updateOne({name:"sonu"},{age:28});
    res.send("Updated Successfully");
})

main().then(() => console.log("connect to db"),
    app.listen(port, () => {
        console.log("Server running at port number" + port);

    })
).catch((error) => console.log(error))


