const http = require("http");


// ! Create server 
// const server = http.createServer((req, res) => {
//   res.write("Hello, this is my first node server ");
//   res.end();
// });

// ! Example
// const server = http.createServer((req, res) => {
//   console.log(req.url); // Requested URL
//   res.writeHead(200, { "Content-Type": "text/html" });
//   res.write("<h1>Welcome to My Node.js Server</h1>");
//   res.write("<h1>Hello welcom to my second server</h1>")
//   res.end();
// });

// ! basic routing 
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>This is home page</h1>");
  }else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>This is about page</h1>");
  } else{
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>404 page is not found </h1>");
  }
  res.end();
});

server.listen(3000, () => {
  console.log("server is running on port 3000.. ");
});
