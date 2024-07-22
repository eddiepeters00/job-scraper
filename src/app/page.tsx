import List from "./components/jobs/List";
import Scraper from "./scraper/Scraper";
import { promises as fs } from "fs";
import { Job } from "./types/types";

export default async function Home() {
  const data = await Scraper({
    url: "https://friday.se/lediga-jobb/",
    listAttribute: ".job-item-grid",
    titleAttribute: ".job-title-text",
  });

  const file = await fs.readFile(process.cwd() + "/data.json", "utf8");
  const fileData: Job[] = JSON.parse(file);
  console.log("Read file", fileData);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <h3>Jobs</h3>
      <List jobs={fileData} />
    </main>
  );
}
