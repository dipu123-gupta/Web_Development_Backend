const main =require("./second");
const {sum,sub,mul}=require('./current/index')

console.log("hello i am first");
sum(7,9);
sub(7,8);
mul(5,4);

// {
//     function () {
//         console.log("hello i am second ");

//         function main(a, b) {
//             console.log(a + b);

//         }
//         main(4,7);
//     }

// }();

main(3, 5);
// CJS Common JS modulej