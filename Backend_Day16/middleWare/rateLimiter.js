const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const client = require("../config/redis.js")

const rateLimiter = async (req,res) => {
    try {
        const ip = req.ip;
        const count = await client.incr(ip);
        console.log(ip);

        console.log(count);
        
        

        if (count >10) {
            throw new Error("User limit Exceded");

        }
 
        if (count==1) {
            await client.expire(60)
            
        }

    } catch (error) {
        res.send("Error" + error)
    }
}

module.exports=rateLimiter;