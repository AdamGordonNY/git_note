import { getAllPosts } from "@/lib/actions/post.actions";

import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";

import AllPosts from "@/components/shared/posts/AllPosts";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  const posts = await getAllPosts({
    page: 1,
    pageSize: 20,
    filter: "new",
  });

  return (
    <main className="flex-center flex w-full text-white-300">
      <div>
        <h2 className="display-2-bold">All Posts</h2>
        <section className="flex w-full flex-col">
          <AllPosts posts={posts?.posts ?? []} />
        </section>
      </div>
    </main>
  );
}
