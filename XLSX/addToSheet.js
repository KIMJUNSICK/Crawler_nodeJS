import xlsx from "xlsx";
import axios from "axios";
import cheerio from "cheerio";
import addToSheet from "./util";

const xlFile = xlsx.readFile("./xlsx/data.xlsx");
const sheets = xlFile.Sheets;
const movieChart = sheets.영화목록; // choose sheet of xl

const records = xlsx.utils.sheet_to_json(movieChart); // xlsx to json

// xlsx order === crawling order
// => but slower than Promise.all
const crawler = async () => {
  addToSheet(movieChart, "C1", "s", "score");
  for (const [index, record] of records.entries()) {
    const response = await axios.get(record.링크);
    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      const ntzScore = $(".score.score_left .star_score").text();
      console.log(index, record.제목, "SCORE:", ntzScore.trim());
      const newCell = "C" + (index + 2);
      addToSheet(movieChart, newCell, "n", parseFloat(ntzScore.trim()));
    }
  }
  xlsx.writeFile(xlFile, "./xlsx/addScore.xlsx");
};

crawler();
