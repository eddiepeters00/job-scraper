"use client";

import { Job } from "@/app/types/types";

type ListProps = {
  jobs: Job[];
};

export default function List(jobs: ListProps) {
  console.log("Jobs from client", jobs);

  return (
    <section>
      <ul>
        {jobs.jobs.map((job) => (
          <li key={job.id}>{job.title}</li>
        ))}
      </ul>
    </section>
  );
}
