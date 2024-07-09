import HeatMap from "@/components/shared/HeatMap";
import { ResourceTagType } from "@/components/shared/ResourceTag";
import PostCard from "@/components/shared/posts/PostCard";
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
  const posts = await getRecentPosts();

  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];
  const commits = cleanPosts.map((post) => ({
    dates: { date: post.createdAt, count: 1 },
  }));

  return (
    <main className="flex min-h-screen w-full flex-col text-white-300">
      <div className="flex items-center justify-between p-14">
        <PostsHeader />
      </div>
      <div className="flex w-full  flex-col gap-4 px-12   max-md:columns-1">
        <HeatMap values={commits} />
        <div className="columns-2 space-y-[18px]">
          {cleanPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              type={post?.postType! as ResourceTagType}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
