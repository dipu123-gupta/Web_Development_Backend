const http = require('http');


const server = http.createServer((req, res) => {
    // res.end("hello coder army")
    if (req.url === '/') {
        res.end("hello coder army")
    }
    else if (req.ural === '/about') {
        res.end("this is about page")
    } else if (req.url === '/contact') {
        res.end("this is contact page")
    } else {
        res.end("page is not found");
    }

});

server.listen(4000, () => {
    console.log("I am Listing at port number 4000");

});