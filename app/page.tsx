import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/sign-in");
  }
  redirect("/dashboard");
  return <div>Redirecting to Dashboard</div>;
};

export default Page;
