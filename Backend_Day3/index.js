const fs = require('fs')
// setTimeout(() => {
//     console.log("hello ji");
    
// }, 3000);

// console.log("jhkj");

let a=10;
let b= "hello ji"

function sum(a,b) {
    return a+b;
    
}

fs.readFile('./data.json', "utf-8", (err,res)=>{
    console.log(res);
    
})

setTimeout(() => {
    console.log("hello Time Out");
    
}, 3000);

console.log(a);
console.log(sum(5,8));


