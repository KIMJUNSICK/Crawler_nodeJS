import parse from "csv-parse/lib/sync";
import fs from "fs";
import puppeteer from "puppeteer";

const csv = fs.readFileSync("./csv/origin.csv");
const records = parse(csv.toString("utf-8"));

console.log(records); // parse => two-dimension Array

// all works is asynchronous
// so async/await is essential
const crawler = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const page2 = await browser.newPage();
  const page3 = await browser.newPage();
  await page.goto("https://zerocho.com");
  await page.waitFor(3000);
  await page.close();
  await page2.goto("https://www.youtube.com/?gl=KR");
  await page2.waitFor(3000);
  await page2.close();
  await page3.goto("https://academy.nomadcoders.co/");
  await page3.waitFor(3000);
  await page3.close();
  await browser.close();
};

crawler();
