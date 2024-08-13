console.log("this is my ccwc");

// const greet = (name) => {
//   return `${name}`;
// }

// greet('Ted')

const result = (function(name) {
    return `${name}`;
  })("John");
  
  console.log(result);