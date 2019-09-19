import parse from "csv-parse/lib/sync";
import fs from "fs";
import puppeteer from "puppeteer";

const csv = fs.readFileSync("./csv/origin.csv");
const records = parse(csv.toString("utf-8"));

console.log(records); // parse => two-dimension Array

// all works is asynchronous
// so async/await is essential
const crawler = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: process.env.NODE_ENV === "production"
    });
    await Promise.all(
      records.map(async (record, index) => {
        // async => can use try/catch
        try {
          const page = await browser.newPage();
          await page.goto(record[1]);
          const search = await page.$(".score.score_left .star_score");
          if (search) {
            const ntzScore = await page.evaluate(
              tag => tag.textContent, //callback
              search
            );
            console.log(index, record[0], parseFloat(ntzScore.trim()));
          }
          // await page.waitFor(3000)
          // deceive pages
          await page.close();
        } catch (e) {
          console.log(e);
        }
      })
    );
    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

crawler();
