import xlsx from "xlsx";
import axios from "axios";
import cheerio from "cheerio";

const xlFile = xlsx.readFile("./xlsx/data.xlsx");
const sheets = xlFile.Sheets;
const sheetNames = xlFile.SheetNames;

console.log(sheetNames);

for (const name of xlFile.SheetNames) {
  const movieChart = xlFile.SheetNames[name];
  console.log(movieChart); // 시트별 ?
}

const movieChart = sheets.영화목록; // choose sheet of xl
const records = xlsx.utils.sheet_to_json(movieChart, { header: "A" }); // xlsx to json
// header:"A" option is for namming metadata A(B,C...)

console.log(movieChart["!ref"]); // parsing 범위 찾기 => A1:B11

// Change Ref
const changeRef = movieChart["!ref"]
  .split(":")
  .map((value, index) => {
    if (index === 0) {
      return "A2";
    }
    return value;
  })
  .join(":");

console.log(changeRef); // "A2:B11"
// or movieChart["!ref"] = "A2:B11"

records.shift(); // removed first row
console.log(records);

// xl file => json(key:value)

// records.forEach((record, index) => {
//   console.log(index, record.제목, record.링크);
// });

// // Array.entries  => two-dimensional Array
// for (const [index, record] of records.entries()) {
//   console.log(index, record.제목, record.링크);
// }

// Promise.all is concurrent
// => fast!
// => crawling order differ from xlsx's data order
// const crawler = async () => {
//   await Promise.all(
//     records.map(async (record, index) => {
//       const response = await axios.get(record.링크);
//       if (response.status === 200) {
//         const html = response.data;
//         const $ = cheerio.load(html); // html tag에 접근 가능하게.
//         const ntzScore = $(".score.score_left .star_score").text();
//         console.log(index, record.제목, "score:", ntzScore.trim()); // xlsx 순서와 다르다.
//       }
//     })
//   );
// };

// xlsx order === crawling order
// => but slower than Promise.all
// const crawler2 = async () => {
//   for (const [index, record] of records.entries()) {
//     const response = await axios.get(record.링크);
//     if (response.status === 200) {
//       const html = response.data;
//       const $ = cheerio.load(html);
//       const ntzScore = $(".score.score_left .star_score").text();
//       console.log(index, record.제목, "SCORE:", ntzScore.trim());
//     }
//   }
// };

// // crawler();
// crawler2();

// difference between 'forEach' and 'for of'
// appear when async occurs
// because JS js single thread

// 정직하게 html data를 주는 곳도 있지만
// 그렇지 않은 곳이 있으므로 => puppeteer
