const express = require('express');
const app = express();
const port = 3000;

const main = require('./dataBase');
const User = require('./model/user')

app.use(express.json());


app.post("/register", async (req, res) => {
  try {
    await User.create(req.body);
    res.send("User Register successfully");
  } catch (error) {
    res.send("Error" + error.message);
  }
});

app.get("/info", async (req, res) => {
  try {
    const result = await User.find();
    res.send(result);
  } catch (error) {
    res.send("Error" + error.message);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const Result = await User.findById(req.params.id);
    res.send(Result);
  } catch (error) {
    res.send("Error" + error.message);
  }
});

app.delete("/user/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("Deleted successfully");
  } catch (error) {
   res.send("Error" + error.message);
  }
});

app.patch("/user", async (req, res) => {
  try {
    const { _id, ...update } = req.body;
    await User.findByIdAndUpdate(_id, update,{runValidators});
    res.send("Updated successfully");
  } catch (error) {
    res.send("Error" + error.message);
  }
});

main()
  .then(async () => {
    console.log("connected successufully Database");
    app.listen(4000, () => {
      console.log("Server running on port number:4000");
    });

    // const result = await Usre.find({ name: "Dipu" });
    // console.log(result);
  })
  .catch(() => console.log("err"));
