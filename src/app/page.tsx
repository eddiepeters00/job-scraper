import List from "./components/jobs/List";
import Scraper from "./scraper/Scraper";
import { Job } from "./types/types";

export default async function Home() {
  const listOfJobs: Job[] = [];

  //Evaluation logic for Friday.se
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
  const fridayData = await Scraper({
    url: "https://friday.se/lediga-jobb/",
    evaluateFunction: fridayEvaluationFunction,
  });

  //Evaluation logic for studentconsulting.se
  const studentConsultingEvaluationFunction = () => {
    const jobCards = Array.from(document.querySelectorAll(".o-job-card"));
    return jobCards.map((jobCard: Element) => {
      const titleElement = jobCard.querySelector(".o-job-card__heading")
        ?.textContent;
      const jobUrl = jobCard.getAttribute("href") || "No URL found";
      const jobLocation = jobCard.querySelector(".o-job-card__tag--sub-value")
        ?.innerHTML;

      const publishedDateElement = jobCard.querySelector(
        ".o-job-card__tag--sub-value.o-job-card__tag--sub-value--right"
      )?.textContent;

      return {
        id: jobCard.getAttribute("data-id") || "No ID found",
        url: jobUrl ? jobUrl.trim() : "No URL found",
        title: titleElement ? titleElement.trim() : "No title found",
        location: jobLocation ? jobLocation.trim() : "Unknown",
        publishedDate: publishedDateElement
          ? publishedDateElement.trim()
          : "No date found",
      };
    });
  };

  //Scrape data from studentConsulting
  const studentConsultingData = await Scraper({
    url:
      "https://www.studentconsulting.com/sv/lediga-jobb/developer-utvecklare-frontend-backend-fullstack?q=developer,utvecklare,frontend,backend,fullstack&page=1",
    evaluateFunction: studentConsultingEvaluationFunction,
  });

  listOfJobs.push(...fridayData, ...studentConsultingData);

  return (
    <main className="min-h-dvh">
      <div className="mt-10">
        <List jobs={listOfJobs} />
      </div>
    </main>
  );
}
