import PostCard from "@/components/shared/posts/PostCard";
import { getAllPosts } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";
import { AnyExpression } from "mongoose";
import React from "react";
// this page will have all the posts of all types
const ExplorePage = async () => {
  const session = await getSession();
  let posts = null;
  if (session) {
    posts = await getAllPosts({ filter: "new" });
  }
  const cleanPosts = JSON.parse(JSON.stringify(posts));
  console.log(cleanPosts);
  return (
    <div className="">
      <span className="display-2-bold">Posts</span>
      <div className="grid grid-cols-2">
        {cleanPosts?.posts.map((post: any, idx: AnyExpression) => (
          <div key={idx}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
