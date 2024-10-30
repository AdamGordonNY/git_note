import Dashboard from "@/components/shared/layout/Dashboard";
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
    <div className="flex min-h-screen w-full flex-col text-white-300">
      <Dashboard cleanPosts={postCardArray} commitArray={commitArray!} />
    </div>
  );
}
