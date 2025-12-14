const express = require("express");

const app = express();

// app.use((req, res) => {
//   res.send({
//     name: "dipu",
//     age: 20,
//     class: "graduaction",
//     village: "madhopur",
//   });
// });

app.get("/", (req, res) => {
  res.send("I am home page");
});

app.get("/about/:id", (req, res) => {
    console.log(req.params);
    
  res.send("<h1>hello i am about page</h1>");
});

app.get("/contact", (req, res) => {
  res.send("<h1>hello ji Welcome to my page</h1>");
});

app.listen(3000, () => {
  console.log("server is running on port number 3000");
});
