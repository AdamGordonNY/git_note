import HeatMap from "@/components/shared/HeatMap";

import AllPosts from "@/components/shared/posts/AllPosts";

import PostsHeader from "@/components/shared/posts/PostsHeader";
import { IPost } from "@/database/models/post.model";
import { getRecentPosts } from "@/lib/actions/post.actions";

import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  const user = session.user?.name!;
  const posts = await getRecentPosts();

  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];
  const dateCountMap = new Map();
  cleanPosts.forEach((post) => {
    const date = post.createdAt;
    if (dateCountMap.has(date)) {
      dateCountMap.set(date, dateCountMap.get(date) + 1);
    } else {
      dateCountMap.set(date, 1);
    }
  });
  const commits = Array.from(dateCountMap, ([date, count]) => ({
    date,
    count,
  }));

  return (
    <main className="flex min-h-screen w-full flex-col text-white-300">
      <div className="flex items-center justify-between p-14">
        <PostsHeader name={user} />
      </div>
      <div className="flex w-full  flex-col gap-4 px-12   max-md:columns-1">
        <HeatMap values={commits} />
        <div className="columns-1 space-y-[18px]">
          <AllPosts posts={cleanPosts} />
        </div>
      </div>
    </main>
  );
}
