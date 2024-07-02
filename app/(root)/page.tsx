import { getAllPosts } from "@/lib/actions/post.actions";

import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  const posts = getAllPosts({
    page: 1,
    pageSize: 10,
    filter: "all",
    searchQuery: "",
  });
  const cleanPosts = JSON.parse(JSON.stringify(posts));

  return (
    <main className="flex-center flex min-h-screen w-full text-white-300"></main>
  );
}
