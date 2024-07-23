import List from "./components/jobs/List";
import Scraper from "./scraper/Scraper";
import { Job } from "./types/types";

export default async function Home() {
  //Scrape data from Friday.se
  const data: Job[] = await Scraper({
    url: "https://friday.se/lediga-jobb/",
    listAttribute: ".job-item-grid",
    titleAttribute: ".job-title-text",
    locationAttribute: ".job-location",
  });

  return (
    <main className="">
      <div className="mt-10">
        <List jobs={data} />
      </div>
    </main>
  );
}
