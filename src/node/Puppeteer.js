const puppeteer = require("puppeteer");
const cheerio = require("cheerio");

const Scrapping = async ({ armorName }) => {
  try {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({ headless: "new" });

    const page = await browser.newPage();
    // Navigate the page to a URL
    await page.goto("https://메이플마켓.com/");

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    //   await page.type(".search-box__input", "automate beyond recorder");

    // Wait and click on first result
    const searchResultSelector = "#armor_name_input";

    await page.waitForSelector(searchResultSelector);
    await page.type(searchResultSelector, armorName);

    const searchBtn =
      "#collapseArmor > div:nth-child(19) > div > div:nth-child(1) > button";

    await page.waitForSelector(searchBtn);
    await page.click(searchBtn);

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(".name");
    const fullTitle = await textSelector?.evaluate((el) => {
      return el.textContent;
    });

    // Print the full title
    console.log("Item name :", fullTitle);

    // 페이지의 HTML을 가져온다.
    const content = await page.content();
    // $에 cheerio를 로드한다.
    const $ = cheerio.load(content);

    const lists = $("tr.auction-item");

    // 모든 리스트를 순환한다.
    const result = [];
    lists.each((index, list) => {
      const name = $(list).find(" td.align-middle.pe-2 > a").text();
      const price = $(list).find(" tr > td.price").text();
      const onceprice = $(list).find(" tr > td.onceprice").text();
      const leftTime = $(list).find("tr > td.lefttime").text();

      result.push({
        index,
        name,
        price,
        onceprice,
        leftTime,
      });
    });

    await browser.close();
    return result;
  } catch (e) {
    throw e;
  }
};

module.exports = Scrapping;
