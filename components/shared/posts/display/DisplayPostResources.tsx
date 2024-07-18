import React from "react";
import greenCheckmark from "@/public/icons/checksquare.svg";
import Image from "next/image";
import Link from "next/link";
const DisplayPostResources = ({
  resources,
}: {
  resources: { title: string; url: string }[];
}) => {
  return (
    <div className="flex w-full flex-col px-[30px]">
      <span className="paragraph-2-bold text-white-100">Resources</span>
      {resources.map((resources, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <Image src={greenCheckmark} alt="checkmark" className="size-4" />
          <Link
            href={resources.url}
            target="_blank"
            rel="noreferrer"
            className="paragraph-2-regular text-white-100"
          >
            {resources.title}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default DisplayPostResources;
