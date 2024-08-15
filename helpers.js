const { readFileSync, writeFileSync } = require("node:fs");

function readJSONFile(path, fileName) {
  const object = readFileSync(`${path}/${fileName}`, "utf-8");
  return object ? JSON.parse(object) : [];
  //readfilesyn logic
}

function writeJSONFile(path, fileName, data) {
  data = JSON.stringify(data);
  return writeFileSync(`${path}/${fileName}`, data, { encoding: "utf-8" });
}

module.exports = {
  readJSONFile,
  writeJSONFile,
};
