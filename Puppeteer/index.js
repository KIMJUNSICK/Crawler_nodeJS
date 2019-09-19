import parse from "csv-parse/lib/sync";
import fs from "fs";
import puppeteer from "puppeteer";

const csv = fs.readFileSync("./csv/origin.csv");
const records = parse(csv.toString("utf-8"));

console.log(records); // parse => two-dimension Array

// all works is asynchronous
// so async/await is essential
const crawler = async () => {
  const browser = await puppeteer.launch({
    headless: process.env.NODE_ENV === "production"
  }); // default of headless opt is 'true' => no display

  // const page = await browser.newPage();
  // const page2 = await browser.newPage();
  // const page3 = await browser.newPage();

  const [page, page2, page3] = await Promise.all([
    browser.newPage(),
    browser.newPage(),
    browser.newPage()
  ]); // 1:1 matching

  // await page.goto("https://zerocho.com"),
  // await page2.goto("https://www.youtube.com/?gl=KR"),
  // await page3.goto("https://academy.nomadcoders.co/")
  //=> not efficient

  await Promise.all([
    page.goto("https://zerocho.com"),
    page2.goto("https://www.youtube.com/?gl=KR"),
    page3.goto("https://academy.nomadcoders.co/")
  ]); // more efficient // modern javascript is awesome!

  await Promise.all([
    page.waitFor(3000),
    page2.waitFor(3000),
    page3.waitFor(3000)
  ]);

  await page.close();
  await page2.close();
  await page3.close();
  await browser.close();
  // Promise.all is more fast than awiat's'
};

crawler();
