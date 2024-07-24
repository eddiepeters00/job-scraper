import List from "./components/jobs/List";
import Scraper from "./scraper/Scraper";

export default async function Home() {
  const fridayEvaluationFunction = () => {
    const jobs = Array.from(document.querySelectorAll(".job-item-grid"));
    return jobs.map((job: Element) => {
      const titleElement = job.querySelector(".job-title-text")?.textContent;
      const jobUrl = job.getAttribute("data-job-url") || "No URL found";
      const jobLocation = job.querySelector(".job-location")?.textContent;
      return {
        id: job.getAttribute("data-id") || "No ID found",
        url: jobUrl ? jobUrl.trim() : "No URL found",
        title: titleElement ? titleElement.trim() : "No title found",
        location: jobLocation ? jobLocation.trim() : "Unknown",
      };
    });
  };

  //Scrape data from Friday.se
  const data = await Scraper({
    url: "https://friday.se/lediga-jobb/",
    evaluateFunction: fridayEvaluationFunction,
  });

  console.log(data);

  return (
    <main className="">
      <div className="mt-10">
        <List jobs={data} />
      </div>
    </main>
  );
}
