const express = require('express');
const app = express();

app.use('/', (req, res) => {
    res.send({name: "dipu", age: 20, gender: "male"})
})

app.use('/about', (req, res) => {
    res.send("this is my about page")
})

app.use('/contact', (req, res) => {
    res.send("this is my contact page")
})

app.listen(3000, () => {
    console.log("Server running at port number 3000");

})