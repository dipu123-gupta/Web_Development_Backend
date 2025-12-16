const mongoose = require('mongoose');
async function main() {
    await mongoose.connect("mongodb://localhost:27017/nongoose2")

    // code likhana suru kar do 

    // const userSchema = new mongoose.Schema({
    //     name: String,
    //     age: Number,
    //     city: String,
    //     gender: String
    // });

    // model ko create karna === Collection karna (Table create karna)
    // class create kari hai
    // const User = mongoose.model("user", userSchema);

    // const user1 = new User({ name: "dipu", age: 20, city: "motihari", gender: "male" });
    // await user1.save();

    // single data ko store karna
    // User.create({ name: "dipu", age: 20, city: "motihari", gender: "male" });

    // bahut sara data ko ek sath insert karna in data base
    // User.insertMany([{ name: "sonu", age: 25, city: "Bgaha", gender: "male" }, { name: "nitish", age: 22, city: "begusarye", gender: "male" }])

    // All data find karna
    // const ans =await User.find({});
    // console.log(ans);

    // find document by particular field 
    // const result =await User.find({name:"dipu"});
    
}

module.exports=main;