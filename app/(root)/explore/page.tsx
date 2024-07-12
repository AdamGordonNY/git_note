// import PostCard from "@/components/shared/posts/PostCard";
// import { getAllPosts } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";

import React, { useEffect } from "react";
// this page will have all the posts of all types
const ExplorePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const session = await getSession();
  // let posts = null;
  if (session) {
    // posts = await getAllPosts({ filter: "new" });
  }
  const filter =
    (searchParams.filter as "newest" | "popular" | "following") || "newest";
  const page = Number(searchParams.page) || 1;
  useEffect(() => {});
  // const cleanPosts = JSON.parse(JSON.stringify(posts));
  return (
    <div className="">
      <span className="display-2-bold">Posts</span>
      <div className="grid grid-cols-2">
        {/* {cleanPosts?.posts.map((post: any, idx: AnyExpression) => (
          <div key={idx} className="flex flex-row">
            <PostCard post={post} type={post.postType} />
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default ExplorePage;
