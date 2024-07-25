import HeatMap from "@/components/shared/HeatMap";
import AllPosts from "@/components/shared/posts/AllPosts";
import PostsHeader from "@/components/shared/posts/PostsHeader";

import { IPost } from "@/database/models/post.model";
import { getRecentPosts } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";

import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: string[];
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  const user = session.user?.name!;
  const posts = await getRecentPosts();
  const commitArray: Date[] = [];
  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

  // eslint-disable-next-line array-callback-return
  const commits = cleanPosts.map((post, idx) => {
    commitArray.push(new Date(post?.createdAt!));
  });
  return (
    <main className="flex min-h-screen w-full flex-col text-white-300">
      <div className="flex items-center justify-between ">
        <Suspense fallback={"Loading..."}>
          <PostsHeader name={user} page="/" filter={searchParams.filter!} />
        </Suspense>
      </div>
      <div className="flex w-full flex-col px-10">
        <Suspense fallback={"Loading..."}>
          <HeatMap values={commits && commitArray} />
        </Suspense>
      </div>
      <Suspense fallback={"Loading..."}>
        <PostsHeader filter="" />
      </Suspense>
      <div className="flex w-full  flex-col gap-4 px-12   max-md:columns-1">
        <div className="columns-1 space-y-[18px]">
          <Suspense fallback={"Loading..."}>
            <AllPosts posts={cleanPosts} searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
