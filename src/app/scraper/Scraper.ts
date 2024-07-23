import puppeteer, { Browser } from "puppeteer";
import { promises as fs } from "fs";

export default async function Scraper({
  url,
  listAttribute,
  titleAttribute,
  locationAttribute,
}: {
  url: string;
  listAttribute: string;
  titleAttribute: string;
  locationAttribute: string;
}) {
  const browser: Browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.goto(url);

  const data = await page.evaluate(
    (
      url: string,
      listAttribute: string,
      titleAttribute: string,
      locationAttribute: string
    ) => {
      const jobs = Array.from(document.querySelectorAll(listAttribute));
      return jobs.map((job: Element) => {
        //Get job title
        const titleElement = job.querySelector(titleAttribute)?.innerHTML;

        //Get jobURL
        const jobUrl = job.getAttribute("data-job-url") || "No URL found";

        //Get location
        const jobLocation = job.querySelector(locationAttribute)?.innerHTML;
        return {
          id: "testID123",
          url: jobUrl ? jobUrl.trim() : "Nu URL found",
          title: titleElement ? titleElement.trim() : "No title found",
          location: jobLocation ? jobLocation.trim() : "Unknown",
        };
      });
    },
    url,
    listAttribute,
    titleAttribute,
    locationAttribute
  );

  await browser.close();

  //Delete old data.json
  try {
    await fs.unlink("data.json");
    console.log("Successfully deleted data.json");
  } catch (error) {
    console.error(error);
  }

  //Write data to data.json
  try {
    await fs.writeFile("data.json", JSON.stringify(data, null, 2));
    console.log("Successfully saved data to JSON");
  } catch (error) {
    console.error(error);
  }

  return data;
}
