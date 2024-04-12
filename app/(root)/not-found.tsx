import React from "react";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col content-center bg-black-900">
      <h2 className="display-1-bold text-white-100">Not Found</h2>
      <p className="text-white-300">Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
