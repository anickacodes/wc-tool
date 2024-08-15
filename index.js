const { argv } = require("node:process");
const fs = require("fs");
const chalk = require("chalk");
const inform = console.log;



 inform(chalk)
function parseTerminalArguments(args) {
  const argRecord = {};
  if (args.length > 0 && args.at(-1).includes(".")) {
    argRecord.path = args.pop();
  } else {
    argRecord.path = null; //will need to read from stndin
  }
  if (args.length > 0) {
    argRecord.option = args[0];
  }
  return argRecord;
}

function getFileText(filePath, callback) {
  if (filePath) {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
      } else {
        callback(data);
      }
    });
  } else {
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => {
      callback(data);
    });
  }
}

function main() {
  const { path, option } = parseTerminalArguments(argv.slice(2));
  getFileText(path, (fileContent) => {
    if (!option) {
      const lines = countLines(fileContent);
      const words = countWords(fileContent);
      const characters = countCharacters(fileContent);
      inform(
        chalk.cyan(
          `Lines: ${lines}, Words: ${words}, Characters: ${characters} - ${
            path || "stdin"
          }`
        )
      );
      return;
    }

    let count;
    switch (option) {
      case "-l":
        count = countLines(fileContent);
        inform(chalk.bgYellow(`Lines: ${count} - ${path || "stdin"}`));
        break;
      case "-w":
        count = countWords(fileContent);
        inform(chalk.magenta(`Words: ${count} - ${path || "stdin"}`));
        break;
      case "-c":
        count = countCharacters(fileContent);
        inform(chalk.bgWhite(`Characters: ${count} - ${path || "stdin"}`));
        break;
      default:
        console.error(
          "Unknown option. Please use '-l' for lines, '-w' for words, or '-c' for characters."
        );
    }
  });
}

const countLines = (text) => text.split("\n").length;

const countWords = (text) => {
  text = text.trim();
  let wordCount = 0;
  let present = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char === " ") {
      if (present) {
        wordCount++;
        present = false;
      }
    } else {
      present = true;
    }
  }
  if (present) wordCount++;
  return wordCount;
};

const countCharacters = (text) => text.length;

main();
