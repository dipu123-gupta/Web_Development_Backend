const express = require("express");

const app = express();
app.use(express.json());

const information = [
  { id: 1, name: "kaushal", distic: "gaya" },
  { id: 2, name: "raunak", distic: "jahanabad" },
  { id: 3, name: "sonu", distic: "narkatiyagang" },
  { id: 4, name: "nitish", distic: "luckysharay" },
  { id: 5, name: "dipu", distic: "motihari" },
  { id: 6, name: "guddu", distic: "muzapharpur" },
];

app.get("/info",(req,res)=>{
    res.send(information);
})
app.get("/info/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const info = information.find((i) => i.id === id);
  res.send(info);
//   console.log(info);
  
});

app.post("/info", (req, res) => {
  console.log(req.body);

  information.push(req.body);
  res.send("Data saved successfully");
});
// app.use("/detail", (req, res) => {
//   res.send({ name: "dipu", age: 22, education: "graduation", percentage: 95 });
// });
 
// app.use("/about", (req, res) => {
//   res.send("i am a about page");
// });

// app.use("/contact", (req, res) => {
//   res.send("i am a contact page page");
// });

// app.post("/user", (req, res) => {
//   console.log( req.body);
//   res.send("Data saved successfully");
// });

app.listen(5000, () => {
  console.log("listening at port 5000");
});

// app.use("/", (req, res) => {
//   res.send("i am a home page");
// });
