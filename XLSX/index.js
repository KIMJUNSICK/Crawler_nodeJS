import xlsx from "xlsx";
import axios from "axios";
import cheerio from "cheerio";

const xlFile = xlsx.readFile("./xlsx/data.xlsx");
const sheets = xlFile.Sheets;

const movieChart = sheets.영화목록; // choose sheet of xl
const records = xlsx.utils.sheet_to_json(movieChart); // xlsx to json

// xl file => json(key:value)

records.forEach((record, index) => {
  console.log(index, record.제목, record.링크);
});

// Array.entries  => two-dimensional Array
for (const [index, record] of records.entries()) {
  console.log(index, record.제목, record.링크);
}

const crawler = async () => {
  await Promise.all(
    records.map(async record => {
      const response = await axios.get(record.링크);
      if (response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html); // html tag에 접근 가능하게.
        const ntzScore = $(".score.score_left .star_score").text();
        console.log(record.제목, "score:", ntzScore.trim());
      }
    })
  );
};

crawler();

// difference between 'forEach' and 'for of'
// appear when async occurs
// because JS js single thread
