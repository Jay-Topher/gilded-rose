import fs from "fs";

const FILE_NAME = "log.txt";

export function logToFile(text: string) {
  fs.writeFileSync(FILE_NAME, text);
}

export function getLogText() {
  return fs.readFileSync(FILE_NAME, "utf-8");
}
