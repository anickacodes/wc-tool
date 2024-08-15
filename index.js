// console.log("this is my ccwc");

// // const chalk = require("chalk");

// // const { readJSONFile, writeJSONFile } = require("./helpers");
// const inform = console.log;

// // function run() {
// //let cartItems = [];

// const option = process.argv.slice(2);
// const command = option[0];
// const file = process.argv[0];

// // console.log('option', option)
// // console.log('command', command)
// // let writeToFile = false;

// // }

// const result = (function (name) {
//   return `${name}`;
// })("John");

// // console.log('home 0 path', process.argv[0]);
// // console.log('file', process.argv[1]);

// // run();

// console.log(option);


// }

const { argv } = require("node:process");
const fs = require("fs");
// print process.argv

function parseTerminalArguments(args) {
  const argRecord = {};
  //check that there is at least one parameter provided and it is a path
  if (args.length === 0 || !args.at(-1).includes(".")) {
    throw new Error("Please supply a valid path");
  }
  argRecord.path = args.pop();
  //only take first option
  if (args.length > 0) {
    argRecord.option = args[0];
  }
  return argRecord;
}
console.log("this is my ccwc");
// getting a file path
// reading parameters from terminal command
// process the file
//read a file
function main() {
  const { path, option } = parseTerminalArguments(argv.slice(2));
  const fileContent = fs.readFileSync(path, "utf-8");

  let count;
  switch (option) {
    case "-l":
      count = countLines(fileContent);
      break;
    case "-w":
      count = countWords(fileContent);
      break;
    case "-c":
      count = countCharacters(fileContent);
      break;
    default:
      console.error(
        "Unknown option. Please use '-l' for lines, '-w' for words, or '-c' for characters."
      );
      process.exit(1);
  }

  console.log(`here are the options ${count} ${path}`);

  console.log(" ", path, " ", option);
}

const countLines = (text) => text.split("\n").length;
const countWords = (text) => {
  text = text.trim();

  let wordCount = 0;
  let present = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === " ") {
      if (found) {
        wordCount++;
        found = false;
      }
    } else {
      found = true;
    }
  }
  if (found) wordCount++;
  return wordCount;
};

const countCharacters = (text) => text.length;
// so now we need to:
// - [ ] write the code to get number of lines(-l)
// - [ ] how do you break text apart by lines?
// - [ ] associate that function with the -l command
// - [ ] do the same for -w and -c


main();

// Output:
// `ccwc -l test.txt`
// `7145 test.txt
