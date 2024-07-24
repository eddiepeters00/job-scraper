import puppeteer, { Browser, EvaluateFunc } from "puppeteer";
import { promises as fs } from "fs";
import { Job } from "../types/types";

export default async function Scraper({
  url,
  evaluateFunction,
}: {
  url: string;
  evaluateFunction: EvaluateFunc<[]>;
}) {
  const browser: Browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.evaluate(evaluateFunction);
    await browser.close();
    await saveData(data);
    return data;
  } catch (error) {
    console.error("Error during scraping");
    throw error;
  }
}

const saveData = async (data: Awaited<ReturnType<EvaluateFunc<[]>>>) => {
  //Delete old data.json
  try {
    await fs.unlink("data.json");
    console.log("Successfully deleted data.json");
  } catch (error) {
    console.error("Could not delete data.json");
    throw error;
  }

  //Write data to data.json
  try {
    await fs.writeFile("data.json", JSON.stringify(data, null, 2));
    console.log("Successfully saved data to JSON");
  } catch (error) {
    console.error("Could not save scraped data");
    throw error;
  }
};
