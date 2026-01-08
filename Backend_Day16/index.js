const express = require("express");
const dotenv = require("dotenv").config();
// const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoute.js");
const client=require("./config/redis.js")
const rateLimiter=require("./middleWare/rateLimiter.js")

const app = express();
const PORT=process.env.PORT

app.use(rateLimiter)
app.use(express.json());
app.use(cookieParser());

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});

const initializeConnection=async()=>{
  try {
    await Promise.all([connectDB(),client.connect()]);
    console.log("db connected");
    

    app.listen(process.env.PORT, () => {
      console.log("Server Running at port number:" + process.env.PORT);
    });

  } catch (error) {
    console.log("Error"+error);
    
  }
}

initializeConnection();


 