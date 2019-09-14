// csv ? comma-separated values, 콤마와 줄바꿈으로 데이터를 저장하는 방식.
// parsing ? 자바스크립트가 아닌 데이터를 js로 읽기.

import parse from "csv-parse/lib/sync";
import fs from "fs";

const csv = fs.readFileSync("./csv/data.csv");
const records = csv.toString("utf-8"); // Buffer -> string

console.log(csv); // Buffer
console.log(records); // String

const parseRecords = parse(records); // String -> two-dimensional array
parseRecords.forEach((data, index) => {
  console.log(index, data);
});
