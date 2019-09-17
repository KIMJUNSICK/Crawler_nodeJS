import xlsx from "xlsx";

const xlFile = xlsx.readFile("./xlsx/data.xlsx");
const sheets = xlFile.Sheets;

const movieChart = sheets.영화목록; // choose sheet of xl
const records = xlsx.utils.sheet_to_json(movieChart); // xlsx to json

// xl file => json(key:value)

records.forEach((obj, index) => {
  console.log(index, obj.제목, obj.링크);
});

// Array.entries  => two-dimensional Array
for (const [index, obj] of records.entries()) {
  console.log(index, obj.제목, obj.링크);
}

// difference between 'forEach' and 'for of'
// appear when async occurs
// because JS js single thread
