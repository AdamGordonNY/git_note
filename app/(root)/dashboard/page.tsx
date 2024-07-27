import HeatMap from "@/components/shared/HeatMap";
import PostCard from "@/components/shared/posts/PostCard";
import PostFilter from "@/components/shared/posts/PostFilter";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { IPost } from "@/database/models/post.model";
import { getPostCount, getRecentPosts } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";
import { CreateType } from "@/types";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  const user = session.user?.name!;

  const pathName = "/dashboard";
  const posts = await getRecentPosts(pathName);

  const commitArray = await getPostCount();

  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

  return (
    <main className="flex min-h-screen w-full flex-col text-white-300">
      <div className="mt-10 flex flex-col   px-10 py-5 ">
        <span className="display-2-bold text-white-100">Hello {user}!</span>{" "}
        <Separator />
        <span> Jot down your latest learnings and thoughts today!</span>
      </div>
      <div className="flex w-full flex-col px-10">
        <Suspense fallback={<Skeleton className="flex w-full  px-10 " />}>
          <HeatMap
            values={commitArray && JSON.parse(JSON.stringify(commitArray))}
          />
        </Suspense>
      </div>

      <div className="flex w-full  flex-col gap-4 px-12 pt-5   max-md:columns-1">
        <div className="display-1-bold flex w-full justify-between text-white-100">
          <span className="text-left">Recent Posts</span>
          <PostFilter />
        </div>
        <div className="columns-1 space-y-[18px]">
          <Suspense fallback={JSON.stringify({ searchParams })}>
            {cleanPosts &&
              posts?.map((post, idx) => (
                <PostCard
                  key={post._id}
                  post={post}
                  type={post.postType as CreateType}
                />
              ))}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
