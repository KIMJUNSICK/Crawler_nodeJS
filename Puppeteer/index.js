import parse from "csv-parse/lib/sync";
import stringify from "csv-stringify/lib/sync";
import fs from "fs";
import puppeteer from "puppeteer";

const csv = fs.readFileSync("./csv/origin.csv");
const records = parse(csv.toString("utf-8"));

const crawler = async () => {
  try {
    const newList = [];
    const browser = await puppeteer.launch({
      headless: process.env.NODE_ENV === "production"
    });
    await Promise.all(
      records.map(async (record, index) => {
        try {
          const page = await browser.newPage();
          await page.goto(record[1]);
          const search = await page.$(".score.score_left .star_score");
          if (search) {
            const ntzScore = await page.evaluate(
              tag => tag.textContent, //callback
              search
            );
            // two-dimension Array
            console.log(index, record[0], parseFloat(ntzScore.trim()));
            // order is same to origin
            newList[index] = [record[0], record[1], ntzScore.trim()];
            // newList.push([index, record[0], record[1], ntzScore.trim()]);
          }
          await page.close();
        } catch (e) {
          console.log(e);
        }
      })
    );
    await browser.close();
    // two-dimension Array => string
    const stringified = stringify(newList);
    fs.writeFileSync("./csv/newList.csv", stringified);
  } catch (error) {
    console.log(error);
  }
};

crawler();
