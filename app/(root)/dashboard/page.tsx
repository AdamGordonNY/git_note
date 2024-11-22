import Dashboard from "@/components/shared/layout/Dashboard";
import { IPost } from "@/database/models/post.model";
import { getRecentPosts } from "@/lib/actions/post.actions";
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
  const email = session?.user?.email;
  const user = await getOneUser(email!);
  if (!user) {
    throw new Error("User not found");
  }

  const posts = await getRecentPosts(10);

  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];
  const postCardArray = cleanPosts.slice(0, 5);

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-black-900 text-white-300">
      <Dashboard cleanPosts={postCardArray} />
    </div>
  );
}
