import PostCard from "@/components/shared/posts/PostCard";
import PostsHeader from "@/components/shared/posts/PostsHeader";
import { ResourceTagType } from "@/components/shared/ResourceTag";
import { IPost } from "@/database/models/post.model";
import { getRecentPosts } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";
import React from "react";

const AllPostsPage = async () => {
  const session = await getSession();
  let posts = null;
  if (session) {
    posts = await getRecentPosts();
  }
  const cleanPosts = JSON.parse(JSON.stringify(posts)) as IPost[];

  return (
    <section className="flex w-full flex-col">
      <div className="flex items-center justify-between p-14">
        <PostsHeader />
      </div>
      <div className="columns-2 space-y-[18px]">
        {cleanPosts &&
          cleanPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              type={post?.postType! as ResourceTagType}
            />
          ))}
      </div>
    </section>
  );
};

export default AllPostsPage;
