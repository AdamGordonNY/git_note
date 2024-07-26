import HeatMap from "@/components/shared/HeatMap";
import AllPosts from "@/components/shared/posts/AllPosts";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { IPost } from "@/database/models/post.model";
import { getRecentPosts } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";
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
  const posts = await getRecentPosts();
  const commitArray: Date[] = [];
  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];
  const filter = searchParams.filter as "knowledge" | "workflow" | "component";
  const page = searchParams.page || "1";

  // eslint-disable-next-line array-callback-return
  const commits = cleanPosts.map((post, idx) => {
    commitArray.push(new Date(post?.createdAt!));
  });
  return (
    <main className="flex min-h-screen w-full flex-col text-white-300">
      <div className="mt-10 flex flex-col   px-10 py-5 ">
        <span className="display-2-bold text-white-100">Hello {user}!</span>{" "}
        <Separator />
        <span> Jot down your latest learnings and thoughts today!</span>
      </div>
      <div className="flex w-full flex-col px-10">
        <Suspense fallback={<Skeleton className="flex w-full  px-10 " />}>
          <HeatMap values={commits && commitArray} />
        </Suspense>
      </div>

      <div className="flex w-full  flex-col gap-4 px-12   max-md:columns-1">
        <div className="columns-1 space-y-[18px]">
          <Suspense fallback={"Loading..."}>
            <AllPosts
              posts={cleanPosts}
              filter={filter!}
              page={page}
              pageSize="5"
            />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
