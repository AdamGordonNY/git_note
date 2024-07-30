import Dashboard from "@/components/shared/layout/Dashboard";
import LeftSidebar from "@/components/shared/layout/LeftSidebar";
import RightSidebar from "@/components/shared/layout/RightSidebar";
import ResourceTag from "@/components/shared/ResourceTag";
import { IPost } from "@/database/models/post.model";
import {
  getPostCount,
  getRecentPosts,
  getUniqueTags,
} from "@/lib/actions/post.actions";
import { getOneUser } from "@/lib/actions/user.actions";
import { getSession } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }
  const user = JSON.parse(
    JSON.stringify(await getOneUser(session.user?.email!))
  );

  const posts = await getRecentPosts(10);

  const commitArray = await getPostCount();

  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];
  const postTags: string[] = await getUniqueTags();
  const postCardArray = cleanPosts.slice(0, 5);
  const slicedTags = postTags.slice(0, 11);
  return (
    <main className="flex min-h-screen w-full flex-col text-white-300">
      <LeftSidebar posts={posts!} />
      <Dashboard
        cleanPosts={postCardArray}
        commitArray={commitArray!}
        user={user.name}
      />
      <RightSidebar user={user}>
        {slicedTags &&
          slicedTags.map((tag) => (
            <ResourceTag type="plain" text={tag} key={tag} />
          ))}
      </RightSidebar>
    </main>
  );
}
