import { getAllPosts } from "@/lib/actions/post.actions";
import { getSession } from "@/lib/authOptions";
import React from "react";

const AllPostsPage = async () => {
  const session = await getSession();
  let posts = null;
  if (session) {
    posts = await getAllPosts({ page: 1, pageSize: 10 });
  }

  return <div>{posts?.posts.length}</div>;
};

export default AllPostsPage;
