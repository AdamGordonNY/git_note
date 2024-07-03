import ResourceTag from "@/components/shared/ResourceTag";
import PostCard from "@/components/shared/posts/PostCard";
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
  console.log(posts);
  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

  return (
    <main className="flex min-h-screen w-full flex-col text-white-300">
      <div className="flex items-center justify-between p-14">
        <span className="display-2-bold text-white-100">Recent Posts</span>
        <ResourceTag type="workflow" />
      </div>
      <div className="flex w-full columns-2 flex-col max-md:columns-1">
        {cleanPosts.map((post) => (
          <PostCard key={post._id} post={post} type={post?.postType!} />
        ))}
      </div>
    </main>
  );
}
