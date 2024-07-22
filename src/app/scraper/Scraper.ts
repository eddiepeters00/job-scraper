import puppeteer, { Browser } from "puppeteer";

export default async function Scraper({
  url,
  listAttribute,
  titleAttribute,
}: {
  url: string;
  listAttribute: string;
  titleAttribute: string;
}) {
  const browser: Browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(
    (url: string, listAttribute: string, titleAttribute: string) => {
      const jobs = Array.from(document.querySelectorAll(listAttribute));
      return jobs.map((job: Element) => {
        //Get job title
        const titleElement = job.querySelector(titleAttribute)?.innerHTML;

        //Get jobURL
        const jobUrl = job.getAttribute("data-job-url") || "No URL found";

        return {
          url: jobUrl,
          title: titleElement ? titleElement.trim() : "No title found",
        };
      });
    },
    url,
    listAttribute,
    titleAttribute
  );

  console.log(data);

  await browser.close();

  //Write data to data.json
  const fs = require("fs");
  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err: any) => {
    if (err) throw err;
    console.log("Successfully saved data to JSON");
  });

  return data;
}
