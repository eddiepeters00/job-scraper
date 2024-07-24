"use client";

import { Job } from "@/app/types/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type ListProps = {
  jobs: Job[];
};

export default function List({ jobs }: ListProps) {
  return (
    <section className="grid place-content-center">
      <div className="p-2 m-4 flex underline">
        <span className="flex-1 font-bold">Title</span>
        <span className="flex-1 font-bold">Location</span>
        <span className="flex-none font-bold">Link</span>
      </div>
      <ul>
        {jobs.map((job) => (
          <li
            className="p-2 m-4 flex items-center justify-center border border-gray-300 bg-gray-100"
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
        ))}
      </ul>
    </section>
  );
}
