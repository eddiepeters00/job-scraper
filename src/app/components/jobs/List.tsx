"use client";

import { Job } from "@/app/types/types";
import Fuse from "fuse.js";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type ListProps = {
  jobs: Job[];
};

export default function List({ jobs }: ListProps) {
  const [filtering, setFiltering] = useState<string>("");

  const fuse = new Fuse(jobs, {
    keys: ["title", "location"],
    includeScore: true,
  });

  const filteredJobs =
    filtering && filtering.length
      ? fuse.search(filtering).map((result) => result.item)
      : jobs;

  return (
    <section className="grid place-content-center w-full">
      <input
        className="p-2 m-2"
        type="text"
        placeholder="Search for your next job"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <div className="p-2 m-4 flex underline">
        <span className="flex-1 font-bold">Title</span>
        <span className="flex-1 font-bold">Location</span>
        <span className="flex-none font-bold">Link</span>
      </div>
      <ul>
        {!filteredJobs.length ? (
          <span>Could not find any jobs right now...</span>
        ) : (
          filteredJobs.flatMap((job) => (
            <li
              className="w-full p-2 m-4 flex items-center justify-center border border-gray-300 bg-gray-100"
              key={job.id}
            >
              <span className="flex-1 overflow-hidden overflow-ellipsis whitespace-wrap">
                {job.title}
              </span>
              <span className="flex-1">{job.location}</span>
              <span className="flex-none">
                <Link href={job.url}>
                  <ArrowRight />
                </Link>
              </span>
            </li>
          ))
        )}
      </ul>
    </section>
  );
}
